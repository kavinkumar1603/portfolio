'use client';

import './ProjectsSection.css';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'engal-sandhai',
    name: 'Engal Sandhai',
    description:
      'A community-driven local marketplace connecting buyers and sellers within neighbourhoods. Features real-time listings, in-app chat, and hyperlocal geolocation search — built to empower grassroots commerce.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github: '#',
    live: '#',
  },
  {
    id: 'parknear',
    name: 'ParkNear',
    description:
      'Smart parking finder that surfaces real-time slot availability near your location. Includes interactive maps, advance slot booking, and QR-based check-in for frictionless parking.',
    tech: ['Next.js', 'Tailwind CSS', 'Google Maps API', 'Firebase'],
    github: '#',
    live: '#',
  },
  {
    id: 'truthlens',
    name: 'TruthLens',
    description:
      'An AI-powered credibility analyser that scores news articles for authenticity using NLP pipelines and a fine-tuned classification model. Surfaces source metadata and confidence ratings.',
    tech: ['Python', 'Scikit-learn', 'FastAPI', 'React'],
    github: '#',
    live: '#',
  },
  {
    id: 'taskmate',
    name: 'TaskMate',
    description:
      'A full-stack productivity board with Kanban-style drag-and-drop columns, role-based access control, and Slack-style threaded activity feeds. Designed for async team collaboration.',
    tech: ['TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    github: '#',
    live: '#',
  },
];

/* ── Icons ── */
function IconGitHub() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ── Single row ── */
function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: (typeof projects)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const numStr = String(index + 1).padStart(2, '0');
  const numBgRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  /* Parallax ghost number on mouse move */
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const numEl = numBgRef.current;
    const row = rowRef.current;
    if (!numEl || !row) return;
    const rect = row.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    numEl.style.transform = `translateY(calc(-50% + ${(y - 0.5) * -18}px)) translateX(${(x - 0.5) * 12}px)`;
  }

  function handleMouseLeave() {
    const numEl = numBgRef.current;
    if (numEl) numEl.style.transform = 'translateY(-50%)';
  }

  return (
    <motion.div
      ref={rowRef}
      className={`prj-row${isOpen ? ' prj-row--open' : ''}`}
      onClick={onToggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Giant ghost index number */}
      <div ref={numBgRef} className="prj-row-num-bg" aria-hidden="true">
        {numStr}
      </div>

      {/* Sweep underline on hover */}
      <div className="prj-row-sweep" aria-hidden="true" />

      {/* Visible row */}
      <div className="prj-row-main">
        <span className="prj-row-index">{numStr}</span>

        <h3 className="prj-row-name">{project.name}</h3>

        {/* Inline tech stack */}
        <div className="prj-row-stack" aria-hidden="true">
          {project.tech.map((t, i) => (
            <span key={t}>
              {t}
              {i < project.tech.length - 1 && (
                <span className="prj-stack-sep">/</span>
              )}
            </span>
          ))}
        </div>

        {/* Circle CTA */}
        <div className="prj-row-cta">
          <span className="prj-row-cta-label">{isOpen ? 'Close' : 'View'}</span>
          <div className="prj-row-circle" aria-hidden="true">
            <IconArrow />
          </div>
        </div>
      </div>

      {/* Animated detail drawer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="prj-row-drawer"
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="prj-row-drawer-inner">
              <p className="prj-row-desc">{project.description}</p>

              <div className="prj-row-side">
                <div className="prj-row-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="prj-tag">{t}</span>
                  ))}
                </div>
                <div className="prj-row-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="prj-row-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconGitHub /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="prj-row-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconExternal /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Section ── */
export default function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section id="projects" className="prj-section">
      <div className="prj-inner">

        {/* Header */}
        <motion.div
          className="prj-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="prj-super">Selected Work</span>
            <h2 className="prj-section-title">Projects</h2>
          </div>
          <div className="prj-header-meta">
            <span className="prj-header-count">{projects.length} projects</span>
            <div className="prj-header-line" />
          </div>
        </motion.div>

        {/* Rows */}
        <div className="prj-list" role="list">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={() => toggle(project.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
