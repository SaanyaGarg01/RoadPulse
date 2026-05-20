import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { citizenReports, type CitizenReport } from '../data/mockData';

const avatarColors = ['#FF6B35', '#00D4FF', '#FF3355', '#00FF88', '#FFD700'];

const CitizenReports: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>(citizenReports);
  const [input, setInput] = useState('');
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new reports appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [reports]);

  // Simulate incoming reports
  useEffect(() => {
    const interval = setInterval(() => {
      const auto: CitizenReport = {
        id: `auto-${Date.now()}`,
        message: [
          '📍 Silk Board Junction — Sudden excavation, total standstill',
          '📍 Hebbal Flyover — Construction debris blocking 2 lanes',
          '📍 Marathahalli Bridge — Repair crew working, half lane open',
        ][Math.floor(Math.random() * 3)],
        location: 'Auto-detected via GPS',
        timestamp: 'Just now',
        lat: 12.95 + Math.random() * 0.08,
        lng: 77.57 + Math.random() * 0.12,
        avatar: 'A',
      };
      setReports(prev => [...prev.slice(-8), auto]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newReport: CitizenReport = {
      id: `user-${Date.now()}`,
      message: `📍 ${input}`,
      location: 'Reported by you',
      timestamp: 'Just now',
      lat: 12.97 + Math.random() * 0.04,
      lng: 77.59 + Math.random() * 0.04,
      avatar: 'Y',
    };
    setReports(prev => [...prev, newReport]);
    setInput('');
  };

  return (
    <section id="citizen-reports" style={{ background: '#0a0a0f', padding: '120px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#00FF88', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>💬 Citizen Intelligence</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Live Citizen Reports
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Citizens report via WhatsApp. AI maps it instantly. Every pin is a data point.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* WhatsApp header */}
          <div style={{
            background: 'rgba(0,255,136,0.08)', borderBottom: '1px solid rgba(0,255,136,0.15)',
            padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #25D366, #128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              💬
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>RoadPulse Community Feed</div>
              <div style={{ fontSize: '12px', color: '#00FF88' }}>
                <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00FF88', marginRight: '6px', animation: 'pulse 1.5s infinite' }} />
                {reports.length} active reports · Live
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: '420px', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence initial={false}>
              {reports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveReport(activeReport === report.id ? null : report.id)}
                  style={{
                    display: 'flex', gap: '12px', alignSelf: report.avatar === 'Y' ? 'flex-end' : 'flex-start',
                    flexDirection: report.avatar === 'Y' ? 'row-reverse' : 'row',
                    cursor: 'pointer', maxWidth: '85%',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: avatarColors[i % avatarColors.length],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700, color: '#fff',
                  }}>
                    {report.avatar}
                  </div>

                  {/* Bubble */}
                  <div style={{
                    background: report.avatar === 'Y' ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${report.avatar === 'Y' ? 'rgba(255,107,53,0.3)' : activeReport === report.id ? '#00D4FF40' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: report.avatar === 'Y' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    padding: '12px 16px',
                    boxShadow: activeReport === report.id ? '0 0 20px rgba(0,212,255,0.2)' : 'none',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ fontSize: '14px', color: '#e8e8e8', lineHeight: 1.5 }}>{report.message}</div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '6px', justifyContent: report.avatar === 'Y' ? 'flex-end' : 'flex-start' }}>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{report.timestamp}</span>
                      {activeReport === report.id && (
                        <span style={{ fontSize: '10px', color: '#00D4FF', fontWeight: 600 }}>
                          📍 Pinned to map
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px',
            display: 'flex', gap: '12px', alignItems: 'center',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="📍 Report a dig site (e.g: MG Road — fresh dig, no barricade)..."
              style={{
                flex: 1, padding: '12px 16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: '14px', outline: 'none',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B35, #cc4a1a)',
                border: 'none', cursor: 'pointer', fontSize: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ➤
            </motion.button>
          </div>
        </motion.div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>
          Click any report to pin it to the live map · New reports appear automatically every 12s
        </p>
      </div>
    </section>
  );
};

export default CitizenReports;
