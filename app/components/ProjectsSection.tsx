'use client';

import './ProjectsSection.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ShapeName } from '../lib/shapes';

type Project = {
  id: string;
  name: string;
  category: string;
  shape: ShapeName;
  form: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
};

// Each project is visualised by a particle form drawn from what it does
const projects: Project[] = [
  {
    id: 'engal-sandhai',
    name: 'Engal Sandhai',
    category: 'Web App · Retail',
    shape: 'bars',
    form: 'Live stock levels',
    description:
      'A web-based billing and realtime stock management system built for a college campus vegetable store. Features role-based auth, static QR payments, and atomic realtime stock updates to prevent overselling.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/kavinkumar1603/Engal-Sandhai',
    live: 'https://engal-sandhai.web.app/',
  },
  {
    id: 'parknear',
    name: 'ParkNear',
    category: 'Web App · Maps',
    shape: 'parking',
    form: 'Slots & location',
    description:
      'A quick parking application that helps users find nearby parking locations, view real-time slot availability by level, and book slots for cars or bikes. Features Google Maps integration and dynamic pricing.',
    tech: ['React', 'Tailwind CSS', 'Google Maps API', 'Node.js'],
    github: 'https://github.com/kavinkumar1603/parknear',
    live: 'https://parknear.vercel.app/',
  },
  {
    id: 'truthlens',
    name: 'TruthLens',
    category: 'Machine Learning · NLP',
    shape: 'lens',
    form: 'A lens on the news',
    description:
      'An ML-powered fact-checking engine that classifies news articles as true or fake using NLP. It features a custom trained Logistic Regression model leveraging TF-IDF vectorization, served via a Python backend.',
    tech: ['Python', 'Scikit-learn', 'React', 'NLP'],
    github: 'https://github.com/kavinkumar1603/truth_lens',
    live: '#',
  },
  {
    id: 'taskmate',
    name: 'TaskMate',
    category: 'Mobile App',
    shape: 'tasks',
    form: 'Tasks, in sync',
    description:
      'A full-stack task management mobile application featuring secure user authentication, an admin dashboard, push notifications, and real-time updates synchronized across devices.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    github: 'https://github.com/kavinkumar1603/Task_Mate',
    live: '#',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => {
    const el = itemRefs.current[i];
    if (!el) return;
    const win = window as typeof window & { lenis?: { scrollTo: (el: HTMLElement) => void } };
    if (win.lenis) win.lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="work">
      <header className="work-head section-head">
        <span className="section-label">(01) — Selected Work</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          Things I&apos;ve <em>built</em>
        </motion.h2>
        <p className="section-intro">
          Four products, each rendered here as a form drawn from what it does.
          Scroll — the field reshapes itself around every project.
        </p>
      </header>

      <div className="work-body">
        <aside className="work-index" aria-label="Project index">
          <p className="work-counter">
            <span>{pad(active + 1)}</span> / {pad(projects.length)}
          </p>
          <ol>
            {projects.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={i === active ? 'is-active' : ''}
                  onClick={() => jump(i)}
                  suppressHydrationWarning
                >
                  <span className="work-index-num">{pad(i + 1)}</span>
                  {p.name}
                </button>
              </li>
            ))}
          </ol>
          <div className="work-progress" aria-hidden="true">
            <div style={{ transform: `scaleY(${(active + 1) / projects.length})` }} />
          </div>
        </aside>

        <div className="work-list">
          {projects.map((p, i) => {
            const hasLive = p.live !== '#';
            return (
              <article
                key={p.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-index={i}
                data-shape={p.shape}
                data-shape-x="0.5"
                data-shape-scale="0.9"
                data-shape-opacity="1"
                className={`work-item${i === active ? ' is-active' : ''}`}
              >
                <motion.div
                  className="work-item-inner"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-30% 0px -30% 0px' }}
                  transition={{ duration: 0.9, ease }}
                >
                  <span className="work-num" aria-hidden="true">{pad(i + 1)}</span>
                  <p className="work-form">
                    <span className="work-form-dot" aria-hidden="true" /> {p.form}
                  </p>
                  <h3 className="work-name">{p.name}</h3>
                  <p className="work-desc">{p.description}</p>

                  <dl className="work-spec">
                    <div>
                      <dt>Type</dt>
                      <dd>{p.category}</dd>
                    </div>
                    <div>
                      <dt>Stack</dt>
                      <dd>{p.tech.join(' · ')}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{hasLive ? 'Live' : 'Source available'}</dd>
                    </div>
                  </dl>

                  <div className="work-links">
                    {hasLive && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="pill pill--solid" data-cursor="Visit">
                        Visit site <Arrow />
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noreferrer" className="pill" data-cursor="Code">
                      Source <Arrow />
                    </a>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
