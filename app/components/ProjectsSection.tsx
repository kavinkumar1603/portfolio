'use client';

import { useEffect, useRef } from 'react';

const projects = [
  {
    emoji: '🛒',
    title: 'E-Commerce Platform',
    desc: 'A full-stack e-commerce solution with real-time inventory management, Stripe payments, and an admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,255,0.15))',
  },
  {
    emoji: '💬',
    title: 'Real-Time Chat App',
    desc: 'WebSocket-powered chat application with rooms, file sharing, emoji reactions, and end-to-end encryption.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(255,101,132,0.25), rgba(108,99,255,0.15))',
  },
  {
    emoji: '📊',
    title: 'Analytics Dashboard',
    desc: 'Data visualization dashboard with interactive charts, real-time metrics, and customizable reporting widgets.',
    tags: ['React', 'D3.js', 'Python', 'FastAPI'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(108,99,255,0.1))',
  },
  {
    emoji: '🤖',
    title: 'AI Content Generator',
    desc: 'An AI-powered writing assistant using OpenAI API with custom prompts, history, and export functionality.',
    tags: ['Next.js', 'OpenAI', 'Prisma', 'Vercel'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(255,101,132,0.15))',
  },
  {
    emoji: '📱',
    title: 'Task Management App',
    desc: 'Kanban-style project management with drag-and-drop, team collaboration, and deadline tracking.',
    tags: ['React', 'TypeScript', 'Supabase', 'DnD Kit'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(0,212,255,0.1))',
  },
  {
    emoji: '🔐',
    title: 'Auth Boilerplate',
    desc: 'Production-ready authentication template with OAuth, 2FA, email verification, and role-based access control.',
    tags: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.1))',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="section-container">
        <div className="projects-header">
          <div>
            <p className="section-label reveal">Featured Work</p>
            <h2 className="section-title reveal reveal-delay-1">
              Projects I&apos;ve built
            </h2>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary reveal reveal-delay-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card project-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="project-img" style={{ background: project.gradient }}>
                <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1 }}>
                  {project.emoji}
                </span>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
