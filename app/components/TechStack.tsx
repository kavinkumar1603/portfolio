'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

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

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, 
    x: 0,
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.7 }
  }
};

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="ts-section">
      <div className="ts-inner">

        {/* ── Top row: label + big title ── */}
        <motion.div 
          className="ts-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="ts-super">What I work with</span>
          <div className="ts-heading-row">
            <h2 className="ts-heading">Tech Stack</h2>
            <span className="ts-count">{stack.length} categories</span>
          </div>
          <div className="ts-top-line" />
        </motion.div>

        {/* ── Category rows ── */}
        <motion.div
          className="ts-rows"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          onMouseLeave={() => setHovered(null)}
        >
          {stack.map((group, gi) => (
            <motion.div
              variants={rowVariants}
              key={group.id}
              className={`ts-row ${
                hovered && hovered !== group.id ? 'ts-row-dim' : ''
              }`}
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
                  <motion.span
                    key={item}
                    className="ts-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (gi * 0.1) + (ii * 0.03), ease: "easeOut" }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom marquee ── */}
        <motion.div 
          className="ts-ticker-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="ts-ticker">
            <div className="ts-ticker-track">
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="ts-ticker-item">
                  {t} <span className="ts-ticker-sep">/</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
