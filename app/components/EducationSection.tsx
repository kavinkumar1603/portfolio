'use client';

import { motion } from 'framer-motion';
import './EducationSection.css';

const educationData = [
  {
    id: 'edu-2',
    year: 'Current',
    degree: 'Bachelor of Engineering in CSE',
    institution: 'Sri Eshwar College of Engineering',
    description:
      'Pursuing a comprehensive curriculum in Computer Science and Engineering, focusing on software development, algorithms, and modern web technologies.',
    skills: ['C++', 'Java', 'Full-stack Web Dev', 'Data Structures'],
  },
  {
    id: 'edu-3',
    year: 'Completed',
    degree: 'Higher Secondary Education (HSE)',
    institution: 'Akshaya Academy Matric Higher Secondary School',
    description:
      'Strong academic foundation focusing on Mathematics, Computer Science, and core sciences.',
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
