'use client';

import './HeroSection.css';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { PRELOADER_DONE } from './Preloader';

const name = ['Kavin', 'Kumar'];

const ease = [0.22, 1, 0.36, 1] as const;

const letter: Variants = {
  hidden: { y: '105%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.1, ease, delay: 0.15 + 0.045 * i } }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.7 + 0.12 * i } }),
};

function subscribePreloaded(cb: () => void) {
  window.addEventListener(PRELOADER_DONE, cb);
  return () => window.removeEventListener(PRELOADER_DONE, cb);
}

function usePreloaded() {
  return useSyncExternalStore(
    subscribePreloaded,
    () => !!(window as typeof window & { __preloaded?: boolean }).__preloaded,
    () => false,
  );
}

function useIndiaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const win = window as typeof window & { lenis?: { scrollTo: (el: HTMLElement) => void } };
  if (win.lenis) win.lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function HeroSection() {
  const ready = usePreloaded();
  const time = useIndiaTime();

  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 700], [0, 120]);
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0]);

  let n = 0;

  return (
    <section
      id="hero"
      className="hero"
      data-shape="orb"
      data-shape-x="0.5"
      data-shape-opacity="0.35"
    >
      <motion.div
        className="hero-inner"
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        style={{ opacity: fadeOut }}
      >
        <div className="hero-top">
          <motion.span className="hero-tag" variants={fade} custom={0}>
            <span className="hero-dot" aria-hidden="true" /> Available for work
          </motion.span>
          <motion.span className="hero-tag" variants={fade} custom={0}>
            India — {time || '--:--'} IST
          </motion.span>
        </div>

        <div className="hero-mid">
          <motion.p className="hero-statement" variants={fade} custom={1}>
            Full stack developer building clean, scalable web apps
            — <em>from pixel to production.</em>
          </motion.p>

          <motion.button
            type="button"
            className="hero-cta"
            onClick={() => scrollToId('projects')}
            variants={fade}
            custom={2}
            data-cursor="Work"
            suppressHydrationWarning
          >
            <span>Selected work</span>
            <span className="hero-cta-arrow" aria-hidden="true">↓</span>
          </motion.button>
        </div>

        <motion.h1 className="hero-name" style={{ y: nameY }} aria-label="Kavin Kumar">
          {name.map((word, w) => (
            <span key={word} className={`hero-word${w === 1 ? ' hero-word--alt' : ''}`} aria-hidden="true">
              {word.split('').map((ch) => {
                const i = n++;
                return (
                  <span key={i} className="hero-letter-mask">
                    <motion.span className="hero-letter" variants={letter} custom={i}>
                      {ch}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>
      </motion.div>
    </section>
  );
}
