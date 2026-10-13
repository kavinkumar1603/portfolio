'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ContactSection.css';

const ENDPOINT = 'https://formsubmit.co/ajax/kavin88701@gmail.com';
const EMAIL = 'kavin88701@gmail.com';

const topics = ['a full-time role', 'an internship', 'a freelance project', 'a collaboration', 'just saying hi'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Inline input that hugs its content so the sentence stays a sentence.
 * A hidden mirror of the text shares the input's grid cell and sets its width.
 */
function Blank({
  name, value, onChange, placeholder, type = 'text', required, autoComplete, label,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  label: string;
}) {
  return (
    <span className={`lf-blank${value ? '' : ' is-empty'}`}>
      <label htmlFor={`lf-${name}`} className="sr-only">{label}</label>
      <span className="lf-blank-mirror" aria-hidden="true">{value || placeholder}</span>
      <input
        id={`lf-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        size={1}
        suppressHydrationWarning
      />
    </span>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [topic, setTopic] = useState(topics[0]);
  const [status, setStatus] = useState<Status>('idle');

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const honey = (e.currentTarget.elements.namedItem('_honey') as HTMLInputElement | null)?.value;
    if (honey) return; // bot

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Portfolio enquiry — ${topic} — ${form.name}`,
          _replyto: form.email,
          name: form.name,
          company: form.company || '—',
          email: form.email,
          topic,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) === 'false') throw new Error('send failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm({ name: '', company: '', email: '', message: '' });
    setTopic(topics[0]);
    setStatus('idle');
  };

  return (
    <section
      id="contact"
      className="lf section"
      data-shape="portal"
      data-shape-x="0.55"
      data-shape-scale="1.1"
      data-shape-opacity="0.45"
    >
      <header className="lf-head">
        <div>
          <span className="section-label">(07) — Contact</span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            Let&apos;s <em>talk.</em>
          </motion.h2>
        </div>

        <dl className="lf-meta">
          <div>
            <dt>Email</dt>
            <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className="lf-meta-links">
              <a href="https://www.linkedin.com/in/ckavinkumar/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/kavinkumar1603" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href="https://x.com/KavinKumar_16" target="_blank" rel="noopener noreferrer">X ↗</a>
            </dd>
          </div>
        </dl>
      </header>

      <motion.div
        className="lf-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease, delay: 0.1 }}
      >
        <div className="lf-card-bar" aria-hidden="true">
          <span>New message</span>
          <span>To: Kavin Kumar</span>
        </div>

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="sent"
              className="lf-done"
              role="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="lf-done-mark" aria-hidden="true">✓</span>
              <p className="lf-sentence">
                Thanks, <em>{form.name.split(' ')[0] || 'friend'}</em>. Your note is on its way —
                I&apos;ll reply to <em>{form.email}</em> soon.
              </p>
              <button type="button" className="pill" onClick={reset}>Write another</button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="lf-form"
              onSubmit={onSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* honeypot — hidden from people, tempting to bots */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="lf-honey" aria-hidden="true" />

              <p className="lf-sentence">
                Hi Kavin, I&apos;m{' '}
                <Blank name="name" label="Your name" placeholder="your name" value={form.name} onChange={update} required autoComplete="name" />
                {' '}from{' '}
                <Blank name="company" label="Company or organisation (optional)" placeholder="company (optional)" value={form.company} onChange={update} autoComplete="organization" />
                , reaching out about
              </p>

              <fieldset className="lf-topics">
                <legend className="sr-only">Topic</legend>
                {topics.map((t) => (
                  <label key={t} className={`lf-topic${topic === t ? ' is-on' : ''}`}>
                    <input
                      type="radio"
                      name="topic"
                      value={t}
                      checked={topic === t}
                      onChange={() => setTopic(t)}
                    />
                    {t}
                  </label>
                ))}
              </fieldset>

              <p className="lf-sentence">
                You can reach me at{' '}
                <Blank name="email" type="email" label="Your email" placeholder="you@email.com" value={form.email} onChange={update} required autoComplete="email" />
                .
              </p>

              <div className="lf-brief">
                <label htmlFor="lf-message" className="lf-brief-label">The details</label>
                <textarea
                  id="lf-message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  value={form.message}
                  onChange={update}
                  placeholder="A few lines about the role, project or idea — timelines and links welcome."
                  suppressHydrationWarning
                />
              </div>

              <div className="lf-actions">
                <p className="lf-note" aria-live="polite">
                  {status === 'error' ? (
                    <span className="lf-error">
                      That didn&apos;t send. Please try again, or email me directly at{' '}
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </span>
                  ) : (
                    'All fields except company are required.'
                  )}
                </p>
                <button type="submit" className="lf-send" disabled={status === 'sending'} data-cursor="Send" suppressHydrationWarning>
                  <span className="lf-send-label">{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                  <span className="lf-send-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
