'use client';

import './CertificationsSection.css';
import { useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

// Images are the real issued certificates
const certifications = [
  {
    id: 'dsa',
    provider: 'Udemy',
    name: 'Mastering Data Structures & Algorithms using C and C++',
    date: 'May 2025',
    image: '/DSA.png',
    link: 'https://ude.my/UC-66dfed77-b531-4073-bcbd-aefe47a70741'
  },
  {
    id: 'react',
    provider: 'Udemy',
    name: 'React JS Masterclass: Zero To Job Ready With 10 Projects',
    date: 'May 2025',
    image: '/react.png',
    link: 'https://ude.my/UC-e4b481fa-253d-410f-aede-9da2ef76bc9b'
  },
  {
    id: 'java-best',
    provider: 'Udemy',
    name: 'Java Best Practices for Efficient, Scalable, and Secure Code',
    date: 'Sept 2025',
    image: '/java.png',
    link: 'https://ude.my/UC-21a3c2ec-0c33-49f9-babc-992ca91f95da'
  },
  {
    id: 'sql',
    provider: 'HackerRank',
    name: 'SQL (Advanced)',
    date: 'Nov 2025',
    image: '/SqlAdvanced.png',
    link: '#'
  },
  {
    id: 'java-complete',
    provider: 'Udemy',
    name: 'The Complete Java Programmer: From Scratch to Advanced',
    date: 'Aug 2025',
    image: '/JAVA1.png',
    link: 'https://ude.my/UC-ebba8300-8d63-4812-a0a0-72cdbc7cb421'
  },
  {
    id: 'node',
    provider: 'Udemy',
    name: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    date: 'Feb 2026',
    image: '/Node.png',
    link: 'https://ude.my/UC-4d68dd0f-070d-423b-bda3-c91f73683d49'
  },
  {
    id: 'nptel',
    provider: 'NPTEL',
    name: 'Design Thinking — A Primer',
    date: 'Jan–Feb 2026',
    image: '/nptel.png',
    link: '#'
  }
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function CertificationsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section
      id="certifications"
      className="cert section"
      data-shape="lattice"
      data-shape-x="0.6"
      data-shape-opacity="0.38"
    >
      <header className="section-head">
        <span className="section-label">(04) — Certifications</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          Always <em>learning</em>
        </motion.h2>
      </header>

      <div className="cert-table" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        <div className="cert-row cert-row--head" aria-hidden="true">
          <span>No.</span><span>Course</span><span>Issuer</span><span>Date</span><span />
        </div>

        <ul>
          {certifications.map((c, i) => {
            const hasLink = c.link !== '#';
            const content = (
              <>
                <span className="cert-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cert-name">{c.name}</span>
                <span className="cert-provider">{c.provider}</span>
                <span className="cert-date">{c.date}</span>
                <span className="cert-arrow" aria-hidden="true">{hasLink ? '↗' : ''}</span>
              </>
            );
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                onMouseEnter={() => setHovered(i)}
              >
                {hasLink ? (
                  <a className="cert-row" href={c.link} target="_blank" rel="noreferrer" data-cursor="View">
                    {content}
                  </a>
                ) : (
                  <div className="cert-row">{content}</div>
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Floating preview of the real certificate */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              className="cert-preview"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease }}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={hovered} src={certifications[hovered].image} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
