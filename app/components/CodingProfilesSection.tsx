'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const TiltCard = ({ profile, index }: { profile: any; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  // Motion values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the 3D tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Map mouse position to glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset card to flat position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      className="cp-3d-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* The Holographic Glare Layer */}
      <motion.div 
        className="cp-glare"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 60%)",
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="cp-card-content" style={{ transform: "translateZ(50px)" }}>
        <h3 className="cp-card-title">{profile.name}</h3>
        <span className="cp-card-user">@kavinkumar</span>
        
        <div className="cp-card-stats">
          {profile.stats.map((stat: any, i: number) => (
            <div key={i} className="cp-stat-row">
              <span className="cp-stat-label">{stat.label}</span>
              <span className="cp-stat-value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="cp-card-footer">
          <span>View Data</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="cp-3d-section">
      <div className="cp-3d-inner">
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

        {/* 3D Cards Container */}
        <div className="cp-cards-grid">
          {profiles.map((profile, index) => (
            <TiltCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
