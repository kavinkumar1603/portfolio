'use client';

import { useEffect, useState } from 'react';

const roles = ['Full Stack Developer', 'React & Next.js Engineer', 'UI/UX Enthusiast', 'Problem Solver'];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const scrollToEnd = () => {
    const target = document.documentElement.scrollHeight - window.innerHeight;
    const win = window as typeof window & { lenis?: { scrollTo: (target: number, opts?: object) => void } };

    if (win.lenis) {
      win.lenis.scrollTo(target, { offset: 0 });
      return;
    }

    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">

      {/* Grid lines background */}
      <div className="hero-grid" />

      <div className="hero-center">
        {/* Name */}
        <h1 className="hero-name">
          Kavin Kumar
        </h1>

        {/* Typewriter role */}
        <div className="hero-role-wrap">
          <span className="hero-role-text">{displayed}</span>
          <span className="hero-cursor" />
        </div>

        {/* Short bio */}
        <p className="hero-bio">
          I build clean, scalable, and performant web applications — from pixel-perfect interfaces
          to robust back-end systems.
        </p>

        

        {/* Scroll hint */}
        <button type="button" className="scroll-hint" onClick={scrollToEnd} aria-label="Scroll to the end of the page">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll down</span>
        </button>

      </div>
    </section>
  );
}
