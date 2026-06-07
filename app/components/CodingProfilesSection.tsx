'use client';

import { useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import './CodingProfilesSection.css';

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    link: 'https://leetcode.com/u/kavin88701/',
    stats: [
      { label: 'Problems Solved', value: '280' },
      { label: 'Global Ranking', value: '511,711' },
      { label: 'Medium/Hard', value: '79' },
    ],
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    link: 'https://www.codechef.com/users/kavinkumarc',
    stats: [
      { label: 'Global Rank', value: '173,470' },
      { label: 'Rating', value: '881 (1★)' },
      { label: 'Total Solved', value: '120' },
    ],
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    link: 'https://www.hackerrank.com/profile/kavin88701',
    stats: [
      { label: 'Java', value: '5 Star' },
      { label: 'SQL', value: '1 Star' },
      { label: 'C', value: '0 Star' },
    ],
  },
  {
    id: 'skillrack',
    name: 'SkillRack',
    link: 'https://www.skillrack.com/faces/resume.xhtml?id=514961&key=99503fcdf6695cab771f85bea7b3a1fa9017a02f',
    stats: [
      { label: 'Certificates', value: '8' },
      { label: 'Status', value: 'Active' },
      { label: 'Profile', value: 'Verified' },
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
