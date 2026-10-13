/**
 * Procedural point clouds for the particle field.
 * Every visual on the site is generated here from math — no images.
 * Each generator returns N xyz triplets roughly within a 3-unit box.
 */

export type ShapeName =
  | 'orb'
  | 'bars'
  | 'parking'
  | 'lens'
  | 'tasks'
  | 'helix'
  | 'knot'
  | 'lattice'
  | 'galaxy'
  | 'terrain'
  | 'portal'
  | 'dust';

type Vec3 = [number, number, number];
type Emit = (r: () => number) => Vec3;

/** Deterministic PRNG so shapes are stable between renders */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const jitter = (r: () => number, s: number) => (r() - 0.5) * s;

/** Fill N points by picking weighted emitters */
function build(N: number, seed: number, parts: [number, Emit][]): Float32Array {
  const r = mulberry32(seed);
  const total = parts.reduce((s, [w]) => s + w, 0);
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let pick = r() * total;
    let emit = parts[0][1];
    for (const [w, e] of parts) {
      if ((pick -= w) <= 0) { emit = e; break; }
    }
    const [x, y, z] = emit(r);
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

const segment = (a: Vec3, b: Vec3, j = 0.012): Emit => (r) => {
  const t = r();
  return [lerp(a[0], b[0], t) + jitter(r, j), lerp(a[1], b[1], t) + jitter(r, j), lerp(a[2], b[2], t) + jitter(r, j)];
};

/* ───────────── Shapes ───────────── */

// Hero — a breathing orb with a faint equatorial ring
function orb(N: number) {
  return build(N, 1, [
    [0.82, (r) => {
      const u = r() * 2 - 1, th = r() * TAU, s = Math.sqrt(1 - u * u);
      const rad = 1.15 + jitter(r, 0.05);
      return [s * Math.cos(th) * rad, u * rad, s * Math.sin(th) * rad];
    }],
    [0.18, (r) => {
      const th = r() * TAU, rad = 1.75 + jitter(r, 0.25);
      return [Math.cos(th) * rad, jitter(r, 0.03), Math.sin(th) * rad];
    }],
  ]);
}

// Engal Sandhai — live stock levels as a field of bars
function bars(N: number) {
  const G = 7, gap = 0.34, w = 0.11;
  const h = (i: number, j: number) => 0.25 + 1.3 * (0.5 + 0.5 * Math.sin(i * 1.3 + j * 0.7) * Math.cos(j * 0.9 - i * 0.4));
  return build(N, 2, [[1, (r) => {
    const i = Math.floor(r() * G), j = Math.floor(r() * G);
    const cx = (i - (G - 1) / 2) * gap, cz = (j - (G - 1) / 2) * gap, H = h(i, j);
    let x = jitter(r, 2 * w), y = r() * H, z = jitter(r, 2 * w);
    // snap to the nearest face → hollow boxes
    const f = r();
    if (f < 0.15) y = H; else if (f < 0.575) x = Math.sign(x || 1) * w; else z = Math.sign(z || 1) * w;
    return [cx + x, y - 0.95, cz + z];
  }]]);
}

// ParkNear — a parking lot grid with a floating location pin
function parking(N: number) {
  const slotW = 0.26, slotD = 0.5, cols = 8, y0 = -0.75;
  const lines: [number, Emit][] = [];
  for (const row of [-1, 1]) {
    const z0 = row * 0.62;
    for (let c = 0; c <= cols; c++) {
      const x = (c - cols / 2) * slotW;
      lines.push([1, segment([x, y0, z0], [x, y0, z0 + row * slotD])]);
    }
    lines.push([4, segment([-(cols / 2) * slotW, y0, z0], [(cols / 2) * slotW, y0, z0])]);
  }
  return build(N, 3, [
    ...lines.map(([w, e]) => [w * 0.55, e] as [number, Emit]),
    [5, (r) => { // pin head
      const u = r() * 2 - 1, th = r() * TAU, s = Math.sqrt(1 - u * u), rad = 0.34;
      return [s * Math.cos(th) * rad, 0.75 + u * rad, s * Math.sin(th) * rad];
    }],
    [4, (r) => { // pin cone
      const t = r(), th = r() * TAU, rad = 0.3 * (1 - t);
      return [Math.cos(th) * rad, 0.62 - t * 1.0, Math.sin(th) * rad];
    }],
    [2, (r) => { // ripple on the ground
      const th = r() * TAU, rad = [0.25, 0.45, 0.65][Math.floor(r() * 3)];
      return [Math.cos(th) * rad, y0 + 0.01, Math.sin(th) * rad];
    }],
  ]);
}

// TruthLens — a camera lens / iris of concentric rings
function lens(N: number) {
  const ring = (rad: number, z: number, j = 0.02): Emit => (r) => {
    const th = r() * TAU;
    return [Math.cos(th) * (rad + jitter(r, j)), Math.sin(th) * (rad + jitter(r, j)), z + jitter(r, j)];
  };
  return build(N, 4, [
    [3, ring(1.3, 0, 0.06)],
    [2, ring(1.05, 0.15)],
    [1.6, ring(0.8, 0.3)],
    [1.2, ring(0.55, 0.42)],
    [2.2, (r) => { // iris blades
      const blade = Math.floor(r() * 9), t = r();
      const a = (blade / 9) * TAU, b = a + 0.9;
      const rad = lerp(0.18, 0.55, t), th = lerp(a, b, t);
      return [Math.cos(th) * rad, Math.sin(th) * rad, 0.45];
    }],
    [1, (r) => { // pupil
      const th = r() * TAU, rad = Math.sqrt(r()) * 0.16;
      return [Math.cos(th) * rad, Math.sin(th) * rad, 0.5];
    }],
  ]);
}

// TaskMate — a phone slab holding a stack of task rows with checkboxes
function tasks(N: number) {
  const W = 0.75, H = 1.45, R = 0.18;
  const outline: Emit = (r) => {
    const per = 2 * (W + H - 4 * R) + TAU * R;
    let d = r() * per;
    const sides: [number, number, number, number][] = [
      [-W / 2 + R, H / 2, W - 2 * R, 0], [W / 2, H / 2 - R, 0, -(H - 2 * R)],
      [W / 2 - R, -H / 2, -(W - 2 * R), 0], [-W / 2, -H / 2 + R, 0, H - 2 * R],
    ];
    const corners: Vec3[] = [[W / 2 - R, H / 2 - R, 0], [W / 2 - R, -H / 2 + R, 0], [-W / 2 + R, -H / 2 + R, 0], [-W / 2 + R, H / 2 - R, 0]];
    for (let k = 0; k < 4; k++) {
      const [sx, sy, dx, dy] = sides[k];
      const len = Math.abs(dx) + Math.abs(dy);
      if (d < len) { const t = d / len; return [sx + dx * t, sy + dy * t, jitter(r, 0.02)]; }
      d -= len;
      const arc = (TAU * R) / 4;
      if (d < arc) {
        const a = Math.PI / 2 - k * (Math.PI / 2) - (d / arc) * (Math.PI / 2);
        const c = corners[k];
        return [c[0] + Math.cos(a) * R, c[1] + Math.sin(a) * R, jitter(r, 0.02)];
      }
      d -= arc;
    }
    return [0, 0, 0];
  };
  const rows: [number, Emit][] = [];
  for (let k = 0; k < 5; k++) {
    const y = 0.48 - k * 0.26, z = 0.06 + k * 0.03;
    const box = 0.09, bx = -0.24;
    rows.push([1.4, segment([-0.08, y, z], [0.28 - (k % 2) * 0.12, y, z], 0.01)]);
    rows.push([0.5, segment([bx - box / 2, y - box / 2, z], [bx + box / 2, y - box / 2, z], 0.006)]);
    rows.push([0.5, segment([bx - box / 2, y + box / 2, z], [bx + box / 2, y + box / 2, z], 0.006)]);
    rows.push([0.5, segment([bx - box / 2, y - box / 2, z], [bx - box / 2, y + box / 2, z], 0.006)]);
    rows.push([0.5, segment([bx + box / 2, y - box / 2, z], [bx + box / 2, y + box / 2, z], 0.006)]);
    if (k < 3) { // ticks on completed tasks
      rows.push([0.4, segment([bx - 0.03, y, z + 0.01], [bx - 0.005, y - 0.03, z + 0.01], 0.005)]);
      rows.push([0.5, segment([bx - 0.005, y - 0.03, z + 0.01], [bx + 0.04, y + 0.035, z + 0.01], 0.005)]);
    }
  }
  return build(N, 5, [[8, outline], ...rows]);
}

// Experience — a double helix of growth
function helix(N: number) {
  return build(N, 6, [
    [4, (r) => {
      const t = r(), strand = r() < 0.5 ? 0 : Math.PI, a = t * TAU * 2.2 + strand;
      return [Math.cos(a) * 0.65 + jitter(r, 0.04), (t - 0.5) * 3.0, Math.sin(a) * 0.65 + jitter(r, 0.04)];
    }],
    [1.2, (r) => {
      const k = Math.floor(r() * 26), t = (k + 0.5) / 26, a = t * TAU * 2.2, s = r() * 2 - 1;
      return [Math.cos(a) * 0.65 * s, (t - 0.5) * 3.0, Math.sin(a) * 0.65 * s];
    }],
  ]);
}

// Stack — a (3,7) torus knot
function knot(N: number) {
  const p = 3, q = 7;
  return build(N, 7, [[1, (r) => {
    const t = r() * TAU, rr = 0.75 + 0.3 * Math.cos(q * t);
    const c: Vec3 = [rr * Math.cos(p * t), rr * Math.sin(p * t), 0.3 * Math.sin(q * t)];
    const th = r() * TAU, tube = 0.07;
    return [c[0] + Math.cos(th) * tube, c[1] + Math.sin(th) * tube, c[2] + jitter(r, tube * 2)];
  }]]);
}

// Certifications — a crystalline cube lattice
function lattice(N: number) {
  const n = 3, s = 0.6, half = ((n - 1) * s) / 2;
  const edges: [number, Emit][] = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
    const u = a * s - half, v = b * s - half;
    edges.push([1, segment([-half, u, v], [half, u, v])]);
    edges.push([1, segment([u, -half, v], [u, half, v])]);
    edges.push([1, segment([u, v, -half], [u, v, half])]);
  }
  return build(N, 8, [
    ...edges,
    [3, (r) => { // node glints
      const pick = () => Math.floor(r() * n) * s - half;
      return [pick() + jitter(r, 0.06), pick() + jitter(r, 0.06), pick() + jitter(r, 0.06)];
    }],
  ]);
}

// Education — a slow spiral galaxy
function galaxy(N: number) {
  return build(N, 9, [[1, (r) => {
    const arm = Math.floor(r() * 3), d = Math.pow(r(), 0.7) * 1.7;
    const a = (arm / 3) * TAU + d * 2.4 + jitter(r, 0.5 / (d + 0.4));
    return [Math.cos(a) * d, jitter(r, 0.12 * (1.8 - d)), Math.sin(a) * d];
  }]]);
}

// Coding profiles — a data terrain
function terrain(N: number) {
  return build(N, 10, [[1, (r) => {
    const gx = Math.floor(r() * 60), gz = Math.floor(r() * 30);
    const x = (gx / 59 - 0.5) * 3.6, z = (gz / 29 - 0.5) * 1.8;
    const y = 0.28 * Math.sin(x * 2.1) * Math.cos(z * 2.7) + 0.16 * Math.sin(x * 4.3 + z * 3.1);
    return [x, y - 0.3, z];
  }]]);
}

// Contact — a portal ring with particles spiralling in
function portal(N: number) {
  return build(N, 11, [
    [3, (r) => {
      const th = r() * TAU, rad = 1.25 + jitter(r, 0.07);
      return [Math.cos(th) * rad, Math.sin(th) * rad, jitter(r, 0.08)];
    }],
    [2, (r) => {
      const t = r(), a = t * TAU * 3 + r() * 0.3, rad = 1.2 * Math.sqrt(t);
      return [Math.cos(a) * rad, Math.sin(a) * rad, -0.6 * (1 - t)];
    }],
  ]);
}

// Footer — loose drifting dust
function dust(N: number) {
  return build(N, 12, [[1, (r) => [jitter(r, 6), jitter(r, 3.5), jitter(r, 3)]]]);
}

const generators: Record<ShapeName, (N: number) => Float32Array> = {
  orb, bars, parking, lens, tasks, helix, knot, lattice, galaxy, terrain, portal, dust,
};

export function makeShape(name: ShapeName, N: number) {
  return generators[name](N);
}

export const SHAPES = Object.keys(generators) as ShapeName[];
