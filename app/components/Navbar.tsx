'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 50);
      setProgress((scrollY / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const win = window as typeof window & { lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
            KK.
          </a>
          <ul className="nav-links">
            <li>
              <a
                href="#contact"
                className="nav-cta"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
