'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'React & Next.js Engineer',
  'UI / UX Enthusiast',
  'Problem Solver',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let t: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex]);

  const scrollDown = () => {
    const win = window as typeof window & { lenis?: { scrollTo: (t: number) => void } };
    const bottom = document.documentElement.scrollHeight - window.innerHeight;
    if (win.lenis) win.lenis.scrollTo(bottom);
    else window.scrollTo({ top: bottom, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">

      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-center">

        {/* Name — static gradient, no animation */}
        <h1 className="hero-name">Kavin Kumar</h1>

        {/* Typewriter role */}
        <div className="hero-role-wrap">
          <span className="hero-role-text">{displayed}</span>
          <span className="hero-cursor" />
        </div>

        {/* Bio */}
        <p className="hero-bio">
          I build clean, scalable web applications — from pixel-perfect interfaces
          to robust back-end systems.
        </p>

      </div>

      {/* Scroll hint — pinned to bottom */}
      <button
        type="button"
        className="scroll-hint"
        onClick={scrollDown}
        aria-label="Scroll down"
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </button>

    </section>
  );
}
