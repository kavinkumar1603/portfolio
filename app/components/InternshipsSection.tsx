'use client';

import './InternshipsSection.css';
import { useEffect, useRef } from 'react';

const internships = [
  {
    id: 'technovanam',
    company: 'Technovanam',
    icon: '🏢',
    role: 'Intern',
    duration: 'Duration coming soon...',
    description: 'Description coming soon...',
    tech: ['Tech Stack 1', 'Tech Stack 2'],
    link: '#'
  },
  {
    id: 'efiq',
    company: 'Efiq Solutions',
    icon: '💼',
    role: 'Intern',
    duration: 'Duration coming soon...',
    description: 'Description coming soon...',
    tech: ['Tech Stack 1', 'Tech Stack 2'],
    link: '#'
  }
];

export default function InternshipsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach(el => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="internships" className="int-section" ref={sectionRef}>
      <div className="int-header reveal">
        <span className="int-super">Experience</span>
        <h2 className="int-title-text">Internships</h2>
      </div>

      <div className="int-timeline">
        {internships.map((internship, index) => (
          <div key={internship.id} className={`int-item reveal reveal-delay-${index + 1}`}>
            <div className="int-dot" />

            <div className="int-card">
              {/* ── Default: blurred icon + company name ── */}
              <div className="int-front">
                <div className="int-logo-blur">{internship.icon}</div>
                <h3 className="int-front-name">{internship.company}</h3>
              </div>

              {/* ── Hover: full details overlay ── */}
              <div className="int-overlay">
                <h3 className="int-role">{internship.role}</h3>
                <h4 className="int-company-small">@ {internship.company}</h4>
                <div className="int-duration">{internship.duration}</div>
                <p className="int-desc">{internship.description}</p>
                <div className="int-tech">
                  {internship.tech.map(t => (
                    <span key={t} className="int-tech-tag">{t}</span>
                  ))}
                </div>
                <a href={internship.link} target="_blank" rel="noreferrer" className="int-view-link">
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
