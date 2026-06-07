'use client';

import { useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import './CodingProfilesSection.css';

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    link: '#',
    stats: [
      { label: 'Problems Solved', value: '500+' },
      { label: 'Max Rating', value: '1850' },
      { label: 'Badges', value: 'Knight' },
    ],
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    link: '#',
    stats: [
      { label: 'Global Rank', value: 'Top 5%' },
      { label: 'Rating', value: '4 Star' },
      { label: 'Highest Rating', value: '1820' },
    ],
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    link: '#',
    stats: [
      { label: 'Problem Solving', value: '6 Star' },
      { label: 'C++', value: '5 Star' },
      { label: 'Gold Badges', value: '5' },
    ],
  },
  {
    id: 'skillrack',
    name: 'SkillRack',
    link: '#',
    stats: [
      { label: 'Tracks Completed', value: '25+' },
      { label: 'Total Points', value: '15,000+' },
      { label: 'Medals', value: '12' },
    ],
  },
];

export default function CodingProfilesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('cp-spotlight-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section id="coding-profiles" className="cp-spotlight-section">
      <div className="cp-spotlight-inner">
        {/* Header */}
        <motion.div
          className="cp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="cp-super">Stats</span>
          <h2 className="cp-title">Coding Profiles</h2>
        </motion.div>

        {/* Spotlight Grid Container */}
        <div 
          className="cp-cards-grid" 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {profiles.map((profile, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.a
                key={profile.id}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`cp-spotlight-card ${isOtherHovered ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* The Border Spotlight */}
                <div className="cp-card-border" />
                
                {/* The Inner Card Background Spotlight */}
                <div className="cp-card-content">
                  <h3 className="cp-card-title">{profile.name}</h3>
                  <span className="cp-card-user">@kavinkumar</span>
                  
                  <div className="cp-card-stats">
                    {profile.stats.map((stat, i) => (
                      <div key={i} className="cp-stat-row">
                        <span className="cp-stat-label">{stat.label}</span>
                        <span className="cp-stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="cp-card-footer">
                    <span>View Data</span>
                    <motion.svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={{ x: isHovered ? 5 : 0 }}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
