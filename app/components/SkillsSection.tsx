'use client';

import { useEffect, useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: '#6c63ff',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#00d4ff',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Python', 'FastAPI'],
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: '#ff6584',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Drizzle ORM'],
  },
  {
    title: 'DevOps & Tools',
    icon: '🚀',
    color: '#f59e0b',
    skills: ['Git', 'Docker', 'Vercel', 'AWS', 'CI/CD', 'Linux', 'VS Code', 'Figma'],
  },
];

const stackItems = [
  { name: 'React', emoji: '⚛️' },
  { name: 'Next.js', emoji: '▲' },
  { name: 'TypeScript', emoji: '🔷' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'PostgreSQL', emoji: '🐘' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'Tailwind', emoji: '💨' },
  { name: 'GraphQL', emoji: '◉' },
  { name: 'Redis', emoji: '🔴' },
  { name: 'Prisma', emoji: '◈' },
  { name: 'Figma', emoji: '🎨' },
];

export default function SkillsSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const doubled = [...stackItems, ...stackItems];

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center' }}>
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>My Stack</p>
          <h2 className="section-title reveal reveal-delay-1">
            Technologies I work with
          </h2>
          <p className="section-desc reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            A curated set of tools and technologies I use to build modern,
            scalable, and performant applications.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`glass-card skill-category reveal reveal-delay-${i + 1}`}
            >
              <div className="skill-cat-header">
                <div
                  className="skill-cat-icon"
                  style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}40` }}
                >
                  {cat.icon}
                </div>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="stack-marquee">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <div key={i} className="marquee-item">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
