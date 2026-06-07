'use client';

import { motion } from 'framer-motion';
import './EducationSection.css';

const educationData = [
  {
    id: 'edu-2',
    year: '2021',
    degree: 'Bachelor of Engineering in IT',
    institution: 'Anna University',
    description:
      'Core coursework included Data Structures, Operating Systems, and Database Management. Led the University Coding Club and organized hackathons.',
    skills: ['C++', 'Java', 'Full-stack Web Dev'],
  },
  {
    id: 'edu-3',
    year: '2017',
    degree: 'Higher Secondary Education',
    institution: "St. John's High School",
    description:
      'Focused on Computer Science and Mathematics. Valedictorian of the graduating class.',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="edu-timeline-section">
      <div className="edu-inner">
        {/* Header */}
        <motion.div
          className="edu-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="edu-super">Academic Journey</span>
          <h2 className="edu-title">Education</h2>
        </motion.div>

        {/* The Timeline Container */}
        <div className="edu-timeline">
          {/* The vertical tracking line draws downwards */}
          <motion.div 
            className="edu-timeline-track"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: 'top' }}
          />

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              className="edu-timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 }
                }
              }}
            >
              {/* The glowing node pops in */}
              <motion.div 
                className="edu-timeline-node"
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                }}
              >
                <div className="edu-timeline-node-inner" />
              </motion.div>

              {/* The content card slides in elegantly */}
              <motion.div 
                className="edu-timeline-content"
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <div className="edu-item-header">
                  <span className="edu-year">{item.year}</span>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <h4 className="edu-inst">{item.institution}</h4>
                </div>
                
                <p className="edu-desc">{item.description}</p>
                
                <div className="edu-tags">
                  {item.skills.map((skill) => (
                    <span key={skill} className="edu-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
