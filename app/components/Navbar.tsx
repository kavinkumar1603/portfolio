'use client';

import { useEffect, useState } from 'react';

const links = [
  { id: 'projects', label: 'Work' },
  { id: 'internships', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

function useLocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const time = useLocalTime();

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const win = window as typeof window & { lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } };
    if (win.lenis) win.lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="navbar">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
        >
          Kavin Kumar<sup>©</sup>
        </a>

        <p className="nav-meta" suppressHydrationWarning>
          {/* TODO: set your city */}
          India — {time || '--:--'} IST
        </p>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
                >
                  <span className="nav-link-roll" data-text={l.label}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
