'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * Follower cursor (desktop / fine pointers only).
 * - grows over links and buttons
 * - shows a label over any element with data-cursor="Label"
 */
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

function subscribeQuery(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeQuery,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>('[data-cursor]');
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? '');
        setHover(true);
        return;
      }
      setLabel('');
      setHover(!!el.closest('a, button, [role="button"], input, textarea'));
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={dotRef} className="cursor" aria-hidden="true">
      <div className={`cursor-inner${hover ? ' is-hover' : ''}${label ? ' has-label' : ''}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </div>
  );
}
