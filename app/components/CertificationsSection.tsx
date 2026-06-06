'use client';

import './CertificationsSection.css';
import { useEffect, useRef } from 'react';

const certifications = [
  {
    id: 'dsa',
    provider: 'Udemy',
    name: 'Mastering Data Structures & Algorithms using C and C++',
    date: 'May 2025',
    image: '/DSA.png',
    link: 'https://ude.my/UC-66dfed77-b531-4073-bcbd-aefe47a70741'
  },
  {
    id: 'react',
    provider: 'Udemy',
    name: 'React JS Masterclass: Zero To Job Ready With 10 Projects',
    date: 'May 2025',
    image: '/react.png',
    link: 'https://ude.my/UC-e4b481fa-253d-410f-aede-9da2ef76bc9b'
  },
  {
    id: 'java-best',
    provider: 'Udemy',
    name: 'Java Best Practices for Efficient, Scalable, and Secure Code',
    date: 'Sept 2025',
    image: '/java.png',
    link: 'https://ude.my/UC-21a3c2ec-0c33-49f9-babc-992ca91f95da'
  },
  {
    id: 'sql',
    provider: 'HackerRank',
    name: 'SQL (Advanced)',
    date: 'Nov 2025',
    image: '/SqlAdvanced.png',
    link: '#'
  },
  {
    id: 'java-complete',
    provider: 'Udemy',
    name: 'The Complete Java Programmer: From Scratch to Advanced',
    date: 'Aug 2025',
    image: '/JAVA1.png',
    link: 'https://ude.my/UC-ebba8300-8d63-4812-a0a0-72cdbc7cb421'
  },
  {
    id: 'node',
    provider: 'Udemy',
    name: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    date: 'Feb 2026',
    image: '/Node.png',
    link: 'https://ude.my/UC-4d68dd0f-070d-423b-bda3-c91f73683d49'
  },
  {
    id: 'nptel',
    provider: 'NPTEL',
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
        {certifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            {/* Background Image ALWAYS visible */}
            <div className="cert-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.image} alt={cert.name} className="cert-img" />
              <div className="cert-overlay"></div>
            </div>

            {/* Collapsed State: Vertical Text */}
            <div className="cert-collapsed-content">
              <span className="cert-vertical-title">{cert.provider}</span>
            </div>

            {/* Expanded State: Horizontal Info (Fades in on hover) */}
            <div className="cert-expanded-content">
              <div className="cert-meta">
                <span className="cert-provider">{cert.provider}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              <h3 className="cert-name">{cert.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
