'use client';

import { motion } from 'framer-motion';
import './CodingProfilesSection.css';

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: '@kavinkumar',
    link: '#',
    stats: [
      { label: 'Problems Solved', value: '500+' },
      { label: 'Max Rating', value: '1850' },
    ],
    colorClass: 'glow-leetcode',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    username: '@kavinkumar',
    link: '#',
    stats: [
      { label: 'Global Rank', value: 'Top 5%' },
      { label: 'Rating', value: '4 Star' },
    ],
    colorClass: 'glow-codechef',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    username: '@kavinkumar',
    link: '#',
    stats: [
      { label: 'Badges', value: '5 Gold' },
      { label: 'Problem Solving', value: '6 Star' },
    ],
    colorClass: 'glow-hackerrank',
  },
  {
    id: 'skillrack',
    name: 'SkillRack',
    username: '@kavinkumar',
    link: '#',
    stats: [
      { label: 'Tracks Completed', value: '25+' },
      { label: 'Points', value: '15,000+' },
    ],
    colorClass: 'glow-skillrack',
  },
];

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="cp-section">
      <div className="cp-inner">
        {/* Header */}
        <motion.div
          className="cp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="cp-super">Competitive Programming</span>
          <h2 className="cp-title">Coding Profiles</h2>
        </motion.div>

        {/* Grid Container */}
        <div className="cp-grid">
          {profiles.map((profile, index) => (
            <motion.a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              key={profile.id}
              className={`cp-card ${profile.colorClass}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="cp-card-top">
                <h3 className="cp-name">{profile.name}</h3>
                <span className="cp-username">{profile.username}</span>
              </div>
              
              <div className="cp-stats">
                {profile.stats.map((stat, i) => (
                  <div key={i} className="cp-stat-box">
                    <span className="cp-stat-value">{stat.value}</span>
                    <span className="cp-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="cp-card-footer">
                <span className="cp-view-text">View Profile</span>
                <svg className="cp-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
