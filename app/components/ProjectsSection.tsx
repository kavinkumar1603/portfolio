'use client';

import './ProjectsSection.css';
import { useState } from 'react';
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
      'Smart parking finder that surfaces real-time slot availability near your location. Includes interactive maps, advance slot booking, and QR-based check-in for frictionless parking anywhere in the city.',
    tech: ['Next.js', 'Tailwind CSS', 'Google Maps API', 'Firebase'],
    github: '#',
    live: '#',
  },
  {
    id: 'truthlens',
    name: 'TruthLens',
    description:
      'An AI-powered credibility analyser that scores news articles for authenticity using NLP pipelines and a fine-tuned classification model. Surfaces source metadata and confidence ratings in real time.',
    tech: ['Python', 'Scikit-learn', 'FastAPI', 'React'],
    github: '#',
    live: '#',
  },
  {
    id: 'taskmate',
    name: 'TaskMate',
    description:
      'A full-stack productivity board with Kanban drag-and-drop columns, role-based access control, and Slack-style threaded activity feeds. Designed from the ground up for async team collaboration.',
    tech: ['TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    github: '#',
    live: '#',
  },
];

/* ── Slide animation variants ── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

/* ── Icons ── */
function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l-7 7 7 7" />
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

/* ── Main component ── */
export default function ProjectsSection() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);

  const project = projects[page];
  const total = projects.length;

  function paginate(newDir: number) {
    setPage(([p]) => [(p + newDir + total) % total, newDir]);
  }

  function goTo(i: number) {
    setPage(([p]) => [i, i > p ? 1 : -1]);
  }

  const progress = ((page + 1) / total) * 100;

  return (
    <section id="projects" className="prj-section">
      <div className="prj-inner">

        {/* ── Header ── */}
        <motion.div
          className="prj-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="prj-super">Selected Work</span>
            <h2 className="prj-section-title">Projects</h2>
          </div>
          <p className="prj-hdr-counter">
            <em>{String(page + 1).padStart(2, '0')}</em> / {String(total).padStart(2, '0')}
          </p>
        </motion.div>

        {/* ── Progress track ── */}
        <div className="prj-progress-track" role="progressbar" aria-valuenow={page + 1} aria-valuemax={total}>
          <div className="prj-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* ── Slide stage ── */}
        <div className="prj-stage">
          {/* Ghost number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${page}`}
              className="prj-bg-num"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {String(page + 1).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>

          {/* Slide content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              className="prj-slide"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* LEFT */}
              <div className="prj-slide-left">
                <div className="prj-slide-eyebrow">
                  <span className="prj-slide-idx">
                    {String(page + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
                  </span>
                  <div className="prj-slide-divider" />
                </div>

                <h3 className="prj-slide-name">{project.name}</h3>
                <p className="prj-slide-desc">{project.description}</p>
              </div>

              {/* RIGHT */}
              <div className="prj-slide-right">
                {/* Dark panel: tech stack */}
                <div className="prj-panel">
                  <span className="prj-panel-label">Tech Stack</span>
                  <div className="prj-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="prj-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="prj-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="prj-link"
                  >
                    <IconGitHub /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="prj-link prj-link--primary"
                  >
                    Live Demo <IconExternal />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls ── */}
        <div className="prj-controls">
          <button
            className="prj-nav"
            onClick={() => paginate(-1)}
            aria-label="Previous project"
          >
            <IconArrowLeft /> Prev
          </button>

          <div className="prj-dots" role="tablist" aria-label="Project navigation">
            {projects.map((p, i) => (
              <button
                key={p.id}
                className={`prj-dot${i === page ? ' prj-dot--active' : ''}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === page}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>

          <button
            className="prj-nav"
            onClick={() => paginate(1)}
            aria-label="Next project"
          >
            Next <IconArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}
