'use client';

import { useEffect, useRef } from 'react';
import type { ShapeName } from '../lib/shapes';
import { PRELOADER_DONE } from './Preloader';

/**
 * One fixed WebGL particle field behind the whole site.
 *
 * Any element with data-shape="<name>" claims the field while it crosses
 * the middle of the viewport; the particles then morph into that form.
 * Optional: data-shape-x (horizontal offset, -1…1 of half-width),
 *           data-shape-scale, data-shape-opacity.
 */

type Pose = { rx: number; spin: number; sway?: boolean };

const POSES: Record<ShapeName, Pose> = {
  orb:     { rx: 0.25, spin: 0.12 },
  bars:    { rx: 0.5,  spin: 0.18 },
  parking: { rx: 0.55, spin: 0.14 },
  lens:    { rx: 0,    spin: 0, sway: true },
  tasks:   { rx: 0.1,  spin: 0, sway: true },
  helix:   { rx: 0.1,  spin: 0.3 },
  knot:    { rx: 0.3,  spin: 0.15 },
  lattice: { rx: 0.5,  spin: 0.12 },
  galaxy:  { rx: 1.0,  spin: 0.08 },
  terrain: { rx: 0.55, spin: 0, sway: true },
  portal:  { rx: 0,    spin: 0, sway: true },
  dust:    { rx: 0,    spin: 0.02 },
};

const MORPH_SECONDS = 1.8;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uTurb;
  uniform float uMotion;
  uniform float uSize;
  uniform float uPR;
  uniform vec2  uMouse;
  uniform float uMouseStrength;

  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec4 aRand;

  varying float vAlpha;
  varying float vTint;

  float ease(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float t = clamp((uProgress - aRand.x * 0.35) / 0.65, 0.0, 1.0);
    float e = ease(t);
    vec3 p = mix(aFrom, aTo, e);

    // particles bloom outward mid-morph, then settle
    p += normalize(p + 0.0001) * sin(e * 3.14159) * (0.3 + aRand.y * 0.7);

    // idle drift + scroll turbulence
    float tt = uTime * 0.6 + aRand.z * 6.2831;
    vec3 drift = vec3(sin(tt + p.y * 2.0), cos(tt * 0.9 + p.x * 2.0), sin(tt * 1.1 + p.z * 2.0));
    p += drift * (0.014 + uTurb * 0.22 * aRand.w) * uMotion;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // cursor pushes particles aside (view space)
    vec2 d = mv.xy - uMouse;
    float f = exp(-dot(d, d) * 2.5) * uMouseStrength;
    mv.xy += normalize(d + 1e-4) * f * 0.4;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPR * (0.55 + aRand.y) * (6.0 / -mv.z);

    vAlpha = (0.3 + 0.7 * aRand.w) * smoothstep(11.0, 3.5, -mv.z);
    vTint = step(0.88, aRand.z) + f * 1.5;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uColA;
  uniform vec3  uColB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uColA, uColB, clamp(vTint, 0.0, 1.0));
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
  }
`;

function easeCPU(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Scene3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { makeShape } = await import('../lib/shapes');
      if (disposed || !hostRef.current) return;

      const host = hostRef.current;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = () => window.innerWidth < 860;
      const N = isMobile() ? 9000 : 18000;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return; // no WebGL — the CSS background carries the page
      }
      const pr = Math.min(window.devicePixelRatio || 1, 1.75);
      renderer.setPixelRatio(pr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 50);
      camera.position.z = 6;

      /* ── geometry ── */
      const cache = new Map<ShapeName, Float32Array>();
      const shape = (n: ShapeName) => {
        if (!cache.has(n)) cache.set(n, makeShape(n, N));
        return cache.get(n)!;
      };

      const rand = new Float32Array(N * 4);
      for (let i = 0; i < rand.length; i++) rand[i] = Math.random();

      const from = new Float32Array(shape('dust'));
      const to = new Float32Array(shape('dust'));

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
      geo.setAttribute('aFrom', new THREE.BufferAttribute(from, 3));
      geo.setAttribute('aTo', new THREE.BufferAttribute(to, 3));
      geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
      geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

      const uniforms = {
        uTime: { value: 0 },
        uProgress: { value: 1 },
        uTurb: { value: 0 },
        uMotion: { value: reduce ? 0 : 1 },
        uSize: { value: isMobile() ? 2.6 : 2.2 },
        uPR: { value: pr },
        uMouse: { value: new THREE.Vector2(99, 99) },
        uMouseStrength: { value: 0 },
        uColA: { value: new THREE.Color('#efe9df') },
        uColB: { value: new THREE.Color('#ff5a1f') },
        uOpacity: { value: 0 },
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const group = new THREE.Group();
      const points = new THREE.Points(geo, mat);
      group.add(points);
      scene.add(group);

      /* ── morphing ── */
      let current: ShapeName = 'dust';
      let started = false;

      const setShape = (name: ShapeName) => {
        if (name === current) return;
        // freeze the in-between state into aFrom so interrupted morphs stay continuous
        const p = uniforms.uProgress.value;
        for (let i = 0; i < N; i++) {
          const t = Math.min(1, Math.max(0, (p - rand[i * 4] * 0.35) / 0.65));
          const e = easeCPU(t);
          for (let k = 0; k < 3; k++) {
            const j = i * 3 + k;
            from[j] = from[j] + (to[j] - from[j]) * e;
          }
        }
        to.set(shape(name));
        geo.attributes.aFrom.needsUpdate = true;
        geo.attributes.aTo.needsUpdate = true;
        uniforms.uProgress.value = reduce ? 1 : 0;
        // unwrap spin so switching to a swaying pose doesn't rewind many turns
        group.rotation.y = Math.atan2(Math.sin(group.rotation.y), Math.cos(group.rotation.y));
        spinAngle = group.rotation.y;
        current = name;
      };

      /* ── section tracking ── */
      const target = { x: 0, scale: 1, opacity: 0.9 };
      const pickSection = () => {
        if (!started) return;
        const mid = window.innerHeight * 0.5;
        let el: HTMLElement | null = null;
        document.querySelectorAll<HTMLElement>('[data-shape]').forEach((node) => {
          const r = node.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) el = node; // last match = most nested
        });
        if (!el) return;
        const node = el as HTMLElement;
        const mobile = isMobile();
        setShape(node.dataset.shape as ShapeName);
        target.x = mobile ? 0 : parseFloat(node.dataset.shapeX ?? '0');
        target.scale = parseFloat(node.dataset.shapeScale ?? '1') * (mobile ? 0.78 : 1);
        target.opacity = parseFloat(node.dataset.shapeOpacity ?? '0.9') * (mobile ? 0.7 : 1);
      };

      const start = () => {
        started = true;
        pickSection();
      };
      if ((window as typeof window & { __preloaded?: boolean }).__preloaded) start();
      else window.addEventListener(PRELOADER_DONE, start, { once: true });

      /* ── input ── */
      const mouse = { x: 0, y: 0, active: 0, last: 0 };
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouse.last = performance.now();
      };

      let lastScroll = window.scrollY;
      let scrollQueued = false;
      const onScroll = () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => { scrollQueued = false; pickSection(); });
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        pickSection();
      };

      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      /* ── loop ── */
      const clock = new THREE.Clock();
      let spinAngle = 0;
      let raf = 0;
      const halfH = Math.tan(THREE.MathUtils.degToRad(35 / 2)) * 6;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const rawDt = clock.getDelta();
        const dt = Math.min(rawDt, 0.05);
        const time = clock.elapsedTime;
        uniforms.uTime.value = time;

        if (uniforms.uProgress.value < 1) {
          // wall-clock based so morphs finish on time even at low frame rates
          uniforms.uProgress.value = Math.min(1, uniforms.uProgress.value + Math.min(rawDt, 0.25) / MORPH_SECONDS);
        }

        // scroll velocity → turbulence
        const sy = window.scrollY;
        const v = Math.min(Math.abs(sy - lastScroll) / 60, 1);
        lastScroll = sy;
        uniforms.uTurb.value += (v - uniforms.uTurb.value) * 0.08;

        // cursor in view space at the field's depth
        const recent = performance.now() - mouse.last < 1500 ? 1 : 0;
        mouse.active += (recent - mouse.active) * 0.05;
        uniforms.uMouseStrength.value = reduce ? 0 : mouse.active;
        const mx = mouse.x * halfH * camera.aspect, my = mouse.y * halfH;
        uniforms.uMouse.value.x += (mx - uniforms.uMouse.value.x) * 0.15;
        uniforms.uMouse.value.y += (my - uniforms.uMouse.value.y) * 0.15;

        // pose
        const pose = POSES[current];
        if (!reduce) spinAngle += pose.spin * dt;
        const ry = pose.sway ? Math.sin(time * 0.35) * 0.3 + mouse.x * 0.2 : spinAngle + mouse.x * 0.15;
        group.rotation.y += (ry - group.rotation.y) * 0.05;
        group.rotation.x += (pose.rx - mouse.y * 0.12 - group.rotation.x) * 0.05;

        const worldX = target.x * halfH * camera.aspect;
        group.position.x += (worldX - group.position.x) * 0.05;
        const s = group.scale.x + (target.scale - group.scale.x) * 0.05;
        group.scale.setScalar(s);
        const op = started ? target.opacity : 0;
        uniforms.uOpacity.value += (op - uniforms.uOpacity.value) * 0.04;

        renderer.render(scene, camera);
      };

      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) { clock.getDelta(); tick(); }
      };
      document.addEventListener('visibilitychange', onVisibility);
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        window.removeEventListener(PRELOADER_DONE, start);
        document.removeEventListener('visibilitychange', onVisibility);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="scene3d" aria-hidden="true" />;
}
