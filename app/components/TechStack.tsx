'use client';

import { useEffect, useRef, useState } from 'react';

const stack = [
  {
    id: 'frontend',
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'backend',
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Java', 'Python', 'C', 'C++'],
  },
  {
    id: 'databases',
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'],
  },
  {
    id: 'cloud',
    category: 'Cloud & DevOps',
    items: ['AWS', 'Google Cloud Platform'],
  },
  {
    id: 'tools',
    category: 'Tools',
    items: ['Git', 'Postman', 'Linux', 'Shell Scripting'],
  },
];

const marqueeItems = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS',
  'Node.js', 'Express.js', 'Java', 'Python', 'C++', 'MongoDB',
  'MySQL', 'Firebase', 'AWS', 'Google Cloud', 'Git', 'Postman', 'Linux',
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className="ts-section" ref={sectionRef}>
      <div className="ts-inner">

        {/* ── Top row: label + big title ── */}
        <div className={`ts-top ${visible ? 'ts-visible' : ''}`}>
          <span className="ts-super">What I work with</span>
          <div className="ts-heading-row">
            <h2 className="ts-heading">Tech Stack</h2>
            <span className="ts-count">{stack.length} categories</span>
          </div>
          <div className="ts-top-line" />
        </div>

        {/* ── Category rows ── */}
        <div
          className="ts-rows"
          onMouseLeave={() => setHovered(null)}
        >
          {stack.map((group, gi) => (
            <div
              key={group.id}
              className={`ts-row ${visible ? 'ts-row-in' : ''} ${
                hovered && hovered !== group.id ? 'ts-row-dim' : ''
              }`}
              style={{ animationDelay: `${0.15 + gi * 0.1}s` }}
              onMouseEnter={() => setHovered(group.id)}
            >
              {/* left: index + category */}
              <div className="ts-row-left">
                <span className="ts-row-num">0{gi + 1}</span>
                <span className="ts-row-cat">{group.category}</span>
              </div>

              {/* centre: animated line */}
              <div className="ts-row-line-wrap">
                <div className={`ts-row-line ${hovered === group.id ? 'ts-line-active' : ''}`} />
              </div>

              {/* right: tags */}
              <div className="ts-row-right">
                {group.items.map((item, ii) => (
                  <span
                    key={item}
                    className={`ts-pill ${visible ? 'ts-pill-in' : ''}`}
                    style={{ animationDelay: `${0.3 + gi * 0.1 + ii * 0.045}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom marquee ── */}
        <div className={`ts-ticker-wrap ${visible ? 'ts-visible' : ''}`} style={{ animationDelay: '0.8s' }}>
          <div className="ts-ticker">
            <div className="ts-ticker-track">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="ts-ticker-item">
                  {t} <span className="ts-ticker-sep">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
