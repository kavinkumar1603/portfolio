'use client';

import { motion } from 'framer-motion';
import './EducationSection.css';

const educationData = [
  {
    id: 'edu-2',
    year: 'Current',
    degree: 'Bachelor of Engineering in CSE',
    institution: 'Sri Eshwar College of Engineering',
    description:
      'Pursuing a comprehensive curriculum in Computer Science and Engineering, focusing on software development, algorithms, and modern web technologies.',
    skills: ['C++', 'Java', 'Full-stack Web Dev', 'Data Structures'],
  },
  {
    id: 'edu-3',
    year: 'Completed',
    degree: 'Higher Secondary Education (HSE)',
    institution: 'Akshaya Academy Matric Higher Secondary School',
    description:
      'Strong academic foundation focusing on Mathematics, Computer Science, and core sciences.',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function EducationSection() {
  return (
    <section
      id="education"
      className="edu section"
      data-shape="galaxy"
      data-shape-opacity="0.65"
      data-shape-scale="1.2"
    >
      <header className="section-head">
        <span className="section-label">(05) — Education</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          The <em>foundation</em>
        </motion.h2>
      </header>

      <div className="edu-track">
        <motion.div
          className="edu-line"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
        {educationData.map((item, i) => (
          <motion.article
            key={item.id}
            className="edu-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease, delay: 0.2 + i * 0.15 }}
          >
            <span className={`edu-node${i === 0 ? ' is-current' : ''}`} aria-hidden="true" />
            <p className="edu-year">{item.year}</p>
            <h3 className="edu-degree">{item.degree}</h3>
            <p className="edu-inst"><em>{item.institution}</em></p>
            <p className="edu-desc">{item.description}</p>
            <ul className="edu-tags">
              {item.skills.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
