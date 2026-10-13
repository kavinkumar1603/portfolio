'use client';

import './TechStack.css';
import { motion } from 'framer-motion';

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

const rowA = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Firebase', 'Tailwind'];
const rowB = ['Java', 'Python', 'C++', 'Express', 'MySQL', 'AWS', 'Google Cloud', 'Git'];

const ease = [0.22, 1, 0.36, 1] as const;

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={`ts-marquee${reverse ? ' ts-marquee--rev' : ''}`} aria-hidden="true">
      <div className="ts-marquee-track">
        {loop.map((t, i) => (
          <span key={i} className={i % 2 ? 'is-outline' : ''}>
            {t}<i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="stack" className="ts section" data-shape="knot" data-shape-opacity="0.55" data-shape-scale="1.25">
      <header className="section-head ts-head">
        <span className="section-label">(03) — Toolkit</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          What I <em>work</em> with
        </motion.h2>
        <p className="ts-total">
          <span>{total}</span> tools across {stack.length} disciplines
        </p>
      </header>

      <div className="ts-grid">
        {stack.map((group, gi) => (
          <motion.div
            key={group.id}
            className="ts-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease, delay: gi * 0.08 }}
          >
            <div className="ts-col-head">
              <span className="ts-col-num">{String(gi + 1).padStart(2, '0')}</span>
              <h3>{group.category}</h3>
            </div>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="ts-marquees">
        <Marquee items={rowA} />
        <Marquee items={rowB} reverse />
      </div>
    </section>
  );
}
