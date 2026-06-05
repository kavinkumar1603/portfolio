'use client';

import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>Get In Touch</p>
          <h2 className="section-title reveal reveal-delay-1">
            Let&apos;s work together
          </h2>
          <p className="section-desc reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            {[
              { icon: '📧', label: 'Email', value: 'kavin@example.com' },
              { icon: '📍', label: 'Location', value: 'Tamil Nadu, India' },
              { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/kavinkumar' },
              { icon: '🐙', label: 'GitHub', value: 'github.com/kavinkumar' },
            ].map(item => (
              <div key={item.label} className={`glass-card contact-item reveal`}>
                <div className="contact-icon-wrap">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="glass-card contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                className="form-input"
                type="text"
                placeholder="Project inquiry"
                value={formState.subject}
                onChange={e => setFormState({ ...formState, subject: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Tell me about your project..."
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                required
              />
            </div>

            <button
              id="btn-send-message"
              type="submit"
              className="btn-primary"
              disabled={sending || sent}
              style={{ alignSelf: 'flex-start', opacity: sending ? 0.7 : 1 }}
            >
              {sent ? (
                <>✅ Message Sent!</>
              ) : sending ? (
                <>⏳ Sending...</>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
