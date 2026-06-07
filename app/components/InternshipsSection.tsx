'use client';

import './InternshipsSection.css';
import { useEffect, useRef } from 'react';

const internships = [
  {
    id: 'technovanam',
    company: 'Technovanam',
    logo: '/TV_LOGO.png',
    role: 'MERN Stack Developer',
    duration: 'Internship',
    description: 'Developed and optimized full-stack web applications using the MERN stack. Built responsive frontend interfaces with React and robust backend APIs with Node.js and Express.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: '#'
  },
  {
    id: 'efiq',
    company: 'Efiq Solutions',
    logo: '/ES_LOGO.svg',
    role: 'MERN Stack Developer',
    duration: 'Internship',
    description: 'Architected scalable web solutions leveraging MongoDB and Express. Implemented complex state management in React and ensured seamless data flow across the stack.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
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
              {/* ── Default: crisp logo ── */}
              <div className="int-front">
                <img src={internship.logo} alt={internship.company} className="int-logo-image" />
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
