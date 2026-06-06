'use client';

import './InternshipsSection.css';
import { useEffect, useRef } from 'react';

const internships = [
  { 
    id: 'technovanam', 
    name: 'Technovanam', 
    role: 'Intern',
    duration: 'Duration coming soon...',
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
    tech: ['Tech Stack 1', 'Tech Stack 2'], 
    link: '#' 
  },
  { 
    id: 'efiq', 
    name: 'Efiq Solutions', 
    role: 'Intern',
    duration: 'Duration coming soon...',
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
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
      <div className="int-container">
        
        <div className="int-header reveal">
          <span className="int-super">Experience</span>
          <h2 className="int-title-text">Internships</h2>
        </div>

        <div className="int-grid">
          {internships.map((internship, index) => {
            return (
              <div 
                key={internship.id} 
                className={`int-card reveal reveal-delay-${index + 1}`}
              >
                {/* ── Front (Default) ── */}
                <div className="int-front">
                  <div className="int-logo-wrapper">
                    {/* Placeholder for actual logo */}
                    <div className="int-logo-blur">🏢</div>
                  </div>
                  <h3 className="int-front-company">{internship.name}</h3>
                </div>

                {/* ── Overlay (Hover) ── */}
                <div className="int-overlay">
                  <h3 className="int-role">{internship.role}</h3>
                  <h4 className="int-company-small">@ {internship.name}</h4>
                  <div className="int-duration">{internship.duration}</div>
                  
                  <p className="int-desc">{internship.description}</p>
                  
                  <div className="int-tech">
                    {internship.tech.map(t => (
                      <span key={t} className="int-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
