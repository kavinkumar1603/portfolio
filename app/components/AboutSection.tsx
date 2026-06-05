'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
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

  const highlights = [
    { icon: '🎯', text: 'Problem Solving' },
    { icon: '💻', text: 'Clean Code' },
    { icon: '🎨', text: 'UI/UX Design' },
    { icon: '⚡', text: 'Performance' },
    { icon: '🔒', text: 'Security First' },
    { icon: '📱', text: 'Responsive Design' },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="section-container">
        <div className="about-grid">
          {/* Visual */}
          <div className="about-visual reveal">
            <div className="about-img-wrapper">
              <span className="about-img-placeholder">👨‍💻</span>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,255,0.05) 100%)',
                }}
              />
            </div>
            <div className="about-accent-box">
              <div className="about-accent-num">2+</div>
              <div className="about-accent-text">Years of Experience</div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <p className="section-label reveal reveal-delay-1">About Me</p>
            <h2 className="section-title reveal reveal-delay-1">
              Crafting digital experiences with{' '}
              <span className="gradient-text">passion & precision</span>
            </h2>
            <p className="reveal reveal-delay-2">
              I&apos;m Kavin Kumar, a passionate Full Stack Developer based in India.
              I specialize in building modern, performant web applications that deliver
              exceptional user experiences.
            </p>
            <p className="reveal reveal-delay-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              With a strong foundation in both front-end and back-end development, I love
              turning complex problems into elegant, intuitive solutions. When I&apos;m not
              coding, I&apos;m exploring new technologies and contributing to open-source projects.
            </p>

            <div className="about-highlights reveal reveal-delay-3">
              {highlights.map(h => (
                <div key={h.text} className="highlight-item">
                  <div className="highlight-icon">{h.icon}</div>
                  {h.text}
                </div>
              ))}
            </div>

            <div className="hero-buttons reveal reveal-delay-4" style={{ marginTop: '32px' }}>
              <a href="/resume.pdf" download className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
