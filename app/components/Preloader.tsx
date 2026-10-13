'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PRELOADER_DONE = 'preloader:done';

const MIN_DURATION = 1400;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 200 : MIN_DURATION;
    const start = performance.now();
    let raf = 0;
    let assetsReady = false;

    Promise.all([
      document.fonts?.ready,
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true })),
    ]).then(() => { assetsReady = true; });

    const tick = (now: number) => {
      // ease-out progress; hold at 90 until fonts/images are in
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const target = assetsReady ? eased * 100 : Math.min(eased * 100, 90);
      setCount(Math.floor(target));

      if (t >= 1 && assetsReady) {
        setCount(100);
        setTimeout(() => {
          setDone(true);
          (window as typeof window & { __preloaded?: boolean }).__preloaded = true;
          window.dispatchEvent(new Event(PRELOADER_DONE));
        }, reduce ? 0 : 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-top">
            <span>Kavin Kumar</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>
          <div className="preloader-count">
            {String(count).padStart(3, '0')}
          </div>
          <div className="preloader-bar">
            <div className="preloader-bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
