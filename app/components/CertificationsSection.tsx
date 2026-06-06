'use client';

import './CertificationsSection.css';
import { useEffect, useRef } from 'react';

const certifications = [
  {
    id: 'dsa',
    provider: 'Udemy',
    initials: 'U',
    name: 'Mastering Data Structures & Algorithms using C and C++',
    date: 'May 2025',
    image: '/DSA.png',
    link: 'https://ude.my/UC-66dfed77-b531-4073-bcbd-aefe47a70741'
  },
  {
    id: 'react',
    provider: 'Udemy',
    initials: 'U',
    name: 'React JS Masterclass: Zero To Job Ready With 10 Projects',
    date: 'May 2025',
    image: '/react.png',
    link: 'https://ude.my/UC-e4b481fa-253d-410f-aede-9da2ef76bc9b'
  },
  {
    id: 'java-best',
    provider: 'Udemy',
    initials: 'U',
    name: 'Java Best Practices for Efficient, Scalable, and Secure Code',
    date: 'Sept 2025',
    image: '/java.png',
    link: 'https://ude.my/UC-21a3c2ec-0c33-49f9-babc-992ca91f95da'
  },
  {
    id: 'sql',
    provider: 'HackerRank',
    initials: 'HR',
    name: 'SQL (Advanced)',
    date: 'Nov 2025',
    image: '/SqlAdvanced.png',
    link: '#'
  },
  {
    id: 'java-complete',
    provider: 'Udemy',
    initials: 'U',
    name: 'The Complete Java Programmer: From Scratch to Advanced',
    date: 'Aug 2025',
    image: '/JAVA1.png',
    link: 'https://ude.my/UC-ebba8300-8d63-4812-a0a0-72cdbc7cb421'
  },
  {
    id: 'node',
    provider: 'Udemy',
    initials: 'U',
    name: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    date: 'Feb 2026',
    image: '/Node.png',
    link: 'https://ude.my/UC-4d68dd0f-070d-423b-bda3-c91f73683d49'
  },
  {
    id: 'nptel',
    provider: 'NPTEL',
    initials: 'NP',
    name: 'Design Thinking — A Primer',
    date: 'Jan–Feb 2026',
    image: '/nptel.png',
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

      <div className="cert-accordion reveal reveal-delay-1">
        {certifications.map((cert, index) => (
          <a
            key={cert.id}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
            style={{ '--card-index': index } as React.CSSProperties}
          >
            {/* Narrow strip — always visible */}
            <div className="cert-strip">
              <span className="cert-strip-label">{cert.provider}</span>
            </div>

            {/* Full certificate image + info revealed on expand */}
            <div className="cert-expanded">
              {/* Actual certificate image */}
              <div className="cert-img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="cert-img"
                />
                {/* Gradient overlay for readability */}
                <div className="cert-img-overlay" />
              </div>

              {/* Info bar at bottom */}
              <div className="cert-info-bar">
                <div className="cert-info-left">
                  <span className="cert-exp-provider">{cert.provider}</span>
                  <h3 className="cert-exp-name">{cert.name}</h3>
                </div>
                <div className="cert-info-right">
                  <span className="cert-exp-date">{cert.date}</span>
                  <span className="cert-exp-cta">
                    View Credential
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
