'use client';

import { useState } from 'react';

const projects = [
  { 
    id: 'engal-sandhai', 
    name: 'Engal Sandhai', 
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
    tech: ['React', 'Node.js', 'MongoDB'], 
    github: '#', 
    live: '#' 
  },
  { 
    id: 'parknear', 
    name: 'ParkNear', 
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
    tech: ['Next.js', 'Tailwind CSS'], 
    github: '#', 
    live: '#' 
  },
  { 
    id: 'truthlens', 
    name: 'TruthLens', 
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
    tech: ['Python', 'Machine Learning'], 
    github: '#', 
    live: '#' 
  },
  { 
    id: 'taskmate', 
    name: 'TaskMate', 
    description: 'Description coming soon... (I will update this as soon as you provide it!)', 
    tech: ['TypeScript', 'Express', 'PostgreSQL'], 
    github: '#', 
    live: '#' 
  },
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <section id="projects" className="prj-section">
      <div className={`prj-container ${activeIndex !== null ? 'prj-split-active' : ''}`}>
        
        {/* ── Left Side: List of Names ── */}
        <div className="prj-left">
          <div className="prj-header">
            <span className="prj-super">Recent Work</span>
            <h2 className="prj-section-title">Projects</h2>
          </div>
          <div className="prj-list">
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              const isDimmed = activeIndex !== null && activeIndex !== index;
              
              return (
                <button 
                  key={project.id} 
                  className={`prj-item-btn ${isActive ? 'prj-active' : ''} ${isDimmed ? 'prj-dim' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <h3 className="prj-name-huge">{project.name}</h3>
                  <span className="prj-link-icon">↗</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Side: Details Panel (Only shows when clicked) ── */}
        {activeProject && (
          <div className="prj-right">
            <div className="prj-sticky">
              
              {/* The 'key' forces React to re-mount and trigger the animation when activeProject changes */}
              <div className="prj-details-card" key={activeProject.id}>
                
                <div className="prj-image-placeholder">
                  <span className="prj-image-text">{activeProject.name} Preview</span>
                  <div className="prj-image-glow" />
                </div>

                <div className="prj-info">
                  <h4 className="prj-title">{activeProject.name}</h4>
                  <p className="prj-desc">{activeProject.description}</p>
                  
                  <div className="prj-tech">
                    {activeProject.tech.map(t => (
                      <span key={t} className="prj-tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="prj-links">
                    <a href={activeProject.github} target="_blank" rel="noreferrer" className="prj-link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a href={activeProject.live} target="_blank" rel="noreferrer" className="prj-link prj-link-primary">
                      Live Demo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
