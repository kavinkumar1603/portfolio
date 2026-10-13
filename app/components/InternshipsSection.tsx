'use client';

import './InternshipsSection.css';
import { motion } from 'framer-motion';

const internships = [
  {
    id: 'technovanam',
    company: 'Technovanam',
    logo: '/TV_LOGO.png',
    role: 'MERN Stack Developer',
    duration: 'Internship',
    description: 'Developed and optimized full-stack web applications using the MERN stack. Built responsive frontend interfaces with React and robust backend APIs with Node.js and Express.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'efiq',
    company: 'Efiq Solutions',
    logo: '/ES_LOGO.svg',
    role: 'MERN Stack Developer',
    duration: 'Internship',
    description: 'Architected scalable web solutions leveraging MongoDB and Express. Implemented complex state management in React and ensured seamless data flow across the stack.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function InternshipsSection() {
  return (
    <section
      id="internships"
      className="xp section"
      data-shape="helix"
      data-shape-x="-0.55"
      data-shape-opacity="0.8"
    >
      <div className="xp-grid">
        <header className="section-head">
          <span className="section-label">(02) — Experience</span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            Where I&apos;ve <em>worked</em>
          </motion.h2>
        </header>

        <ol className="xp-list">
          {internships.map((job, i) => (
            <motion.li
              key={job.id}
              className="xp-row"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
            >
              <div className="xp-row-top">
                <span className="xp-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="xp-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={job.logo} alt="" />
                </span>
                <h3 className="xp-company">{job.company}</h3>
                <span className="xp-type">{job.duration}</span>
              </div>
              <div className="xp-row-body">
                <p className="xp-role"><em>{job.role}</em></p>
                <p className="xp-desc">{job.description}</p>
                <ul className="xp-tech" aria-label="Technologies">
                  {job.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
