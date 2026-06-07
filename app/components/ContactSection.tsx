'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContactSection.css';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
};

const getCurrentTime = () => {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date());
};

export default function ContactSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hi! I'm Kavin. What kind of project or role do you want to talk about?",
      time: getCurrentTime(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || step >= 2) return;

    const userText = inputValue;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Check if the user text contains an email address
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const containsEmail = emailRegex.test(userText);

    // Bot reply logic
    if (step === 0) {
      if (containsEmail) {
        // User provided email right away
        setStep(2);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'bot',
              text: "Thank you for reaching out. I have noted your email address and will get back to you shortly.",
              time: getCurrentTime(),
            }
          ]);
        }, 1500);
      } else {
        // Normal flow
        setStep(1);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: 'bot',
              text: "Great! Please provide your email address below, and I will reach out to you.",
              time: getCurrentTime(),
            }
          ]);
        }, 1500);
      }
    } else if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: "Thank you. I have received your email address and will be in touch soon.",
            time: getCurrentTime(),
          }
        ]);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="chat-contact-section">
      <div className="chat-contact-inner">
        
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-super">Contact</span>
          <h2 className="contact-title">Let's Chat.</h2>
        </motion.div>

        <motion.div 
          className="chat-window-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-profile">
              <div className="chat-avatar">K</div>
              <div className="chat-info">
                <h3>Kavin Kumar</h3>
                <span className="status">
                  <span className="status-dot"></span> Online
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>

          {/* Chat History */}
          <div className="chat-history">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  className={`chat-bubble-wrapper ${msg.sender}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`chat-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                  <span className="chat-time">{msg.time}</span>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  className="chat-bubble-wrapper bot"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chat-bubble bot typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="chat-input-area">
            <form onSubmit={handleSubmit} className="chat-form">
              <input
                type={step === 1 ? "email" : "text"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={step >= 2 ? "Chat ended." : step === 1 ? "Your email address..." : "Type a message..."}
                disabled={step >= 2 || isTyping}
                className="chat-input"
              />
              <button 
                type="submit" 
                className="chat-send-btn" 
                disabled={!inputValue.trim() || step >= 2 || isTyping}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
