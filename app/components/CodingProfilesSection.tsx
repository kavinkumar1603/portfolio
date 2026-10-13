'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CodingProfilesSection.css';

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    link: 'https://leetcode.com/u/kavin88701/',
    headline: { value: '280', label: 'Problems solved' },
    stats: [
      { label: 'Global Ranking', value: '511,711' },
      { label: 'Medium/Hard', value: '79' },
    ],
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    link: 'https://www.codechef.com/users/kavinkumarc',
    headline: { value: '120', label: 'Total solved' },
    stats: [
      { label: 'Global Rank', value: '173,470' },
      { label: 'Rating', value: '881 (1★)' },
    ],
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    link: 'https://www.hackerrank.com/profile/kavin88701',
    headline: { value: '5★', label: 'Java' },
    stats: [
      { label: 'SQL', value: '1 Star' },
      { label: 'C', value: '0 Star' },
    ],
  },
  {
    id: 'skillrack',
    name: 'SkillRack',
    link: 'https://www.skillrack.com/faces/resume.xhtml?id=514961&key=99503fcdf6695cab771f85bea7b3a1fa9017a02f',
    headline: { value: '8', label: 'Certificates' },
    stats: [
      { label: 'Status', value: 'Active' },
      { label: 'Profile', value: 'Verified' },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Counts numeric headlines up from zero when they scroll into view.
 * Writes to the DOM directly and always renders the real value first,
 * so the true number shows even if the animation never runs.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!inView || !el || !match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      el.textContent = `${Math.round(target * (1 - Math.pow(1 - t, 4)))}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [inView, value]);

  return <span ref={ref}>{value}</span>;
}

export default function CodingProfilesSection() {
  return (
    <section
      id="coding-profiles"
      className="cp section"
      data-shape="terrain"
      data-shape-opacity="0.7"
      data-shape-scale="1.3"
    >
      <header className="section-head">
        <span className="section-label">(06) — Practice</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          Sharpening the <em>craft</em>
        </motion.h2>
      </header>

      <div className="cp-grid">
        {profiles.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-card"
            data-cursor="Open"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
          >
            <div className="cp-card-top">
              <h3>{p.name}</h3>
              <span className="cp-arrow" aria-hidden="true">↗</span>
            </div>
            <p className="cp-big">
              <CountUp value={p.headline.value} />
            </p>
            <p className="cp-big-label">{p.headline.label}</p>
            <dl className="cp-stats">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
