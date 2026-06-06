'use client';

import './CertificationsSection.css';
import { useEffect, useRef } from 'react';

const certifications = [
  {
    id: 'udemy',
    provider: 'Udemy',
    icon: '🎓',
    name: 'The Complete Web Development Bootcamp',
    date: 'Jan 2024',
    link: '#'
  },
  {
    id: 'nptel',
    provider: 'NPTEL',
    icon: '📜',
    name: 'Joy of Computing using Python',
    date: 'Jul 2023',
    link: '#'
  },
  {
    id: 'hackerrank',
    provider: 'HackerRank',
    icon: '💻',
    name: 'Problem Solving (Basic)',
    date: 'Mar 2023',
    link: '#'
  }
];

export default function CertificationsSection() {
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
    <section id="certifications" className="cert-section" ref={sectionRef}>
      <div className="cert-header reveal">
        <span className="cert-super">Achievements</span>
        <h2 className="cert-title-text">Certifications</h2>
      </div>

      <div className="cert-timeline">
        {certifications.map((cert, index) => (
          <div key={cert.id} className={`cert-item reveal reveal-delay-${index + 1}`}>
            <div className="cert-dot" />
            
            <a href={cert.link} target="_blank" rel="noreferrer" className="cert-card">
              <div className="cert-card-top">
                <div className="cert-icon">{cert.icon}</div>
              </div>

              <span className="cert-provider">{cert.provider}</span>
              <h3 className="cert-name">{cert.name}</h3>

              <div className="cert-bottom">
                <span className="cert-date">{cert.date}</span>
                <span className="cert-link-text">
                  View Credential
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
