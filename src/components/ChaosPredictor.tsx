import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const weatherOptions = ['☀️ Clear', '🌧️ Rain', '⛅ Cloudy', '⛈️ Thunderstorm'];
const zones = ['Central Business District', 'Indiranagar', 'Koramangala', 'Whitefield', 'Yeshwanthpur'];

function getChaosPrediction(sites: number, weather: string, schoolOpen: boolean, marketDay: boolean) {
  let score = 0;
  score += sites * 4;
  if (weather.includes('Rain')) score += 25;
  if (weather.includes('Thunderstorm')) score += 45;
  if (schoolOpen) score += 20;
  if (marketDay) score += 15;

  if (score < 40) return 'LOW';
  if (score < 65) return 'MODERATE';
  if (score < 90) return 'HIGH';
  return 'SEVERE';
}

function generateAlert(sites: number, weather: string, schoolOpen: boolean, marketDay: boolean, zone: string) {
  const level = getChaosPrediction(sites, weather, schoolOpen, marketDay);
  const reasons = [];
  if (sites >= 8) reasons.push(`${sites} dig sites converging`);
  if (weather.includes('Rain') || weather.includes('Thunderstorm')) reasons.push(`${weather} forecast`);
  if (schoolOpen) reasons.push('school opening rush at 8:00 AM');
  if (marketDay) reasons.push('weekly market day crowds');

  const colors: Record<string, string> = { LOW: '#00FF88', MODERATE: '#FFD700', HIGH: '#FF6B35', SEVERE: '#FF3355' };
  const icons: Record<string, string> = { LOW: '✅', MODERATE: '⚠️', HIGH: '⚠️', SEVERE: '🚨' };

  return {
    level,
    color: colors[level],
    icon: icons[level],
    zone,
    time: '08:00 AM – 10:30 AM',
    reason: reasons.join(' + ') || 'normal city traffic patterns',
    congestion: level,
    action: level === 'SEVERE'
      ? `Deploy traffic personnel at 4 key intersections. Issue public advisory.`
      : level === 'HIGH'
      ? `Deploy traffic personnel at 3 intersections. Alert schools.`
      : level === 'MODERATE'
      ? `Send advisory to transport apps. Monitor 2 sites.`
      : `No action required. Standard monitoring.`,
  };
}

const ChaosPredictor: React.FC = () => {
  const [sites, setSites] = useState(12);
  const [weather, setWeather] = useState('🌧️ Rain');
  const [schoolOpen, setSchoolOpen] = useState(true);
  const [marketDay, setMarketDay] = useState(true);
  const [zone, setZone] = useState(zones[0]);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [alert, setAlert] = useState(() => generateAlert(12, '🌧️ Rain', true, true, zones[0]));
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runPrediction = () => {
    const newAlert = generateAlert(sites, weather, schoolOpen, marketDay, zone);
    setAlert(newAlert);
    setDisplayText('');
    setIsTyping(true);

    const fullText = `${newAlert.icon} ${newAlert.level} CHAOS ALERT\n\nTomorrow ${newAlert.time}\nZone: ${newAlert.zone}\n\nReason: ${newAlert.reason}\n\nPredicted congestion: ${newAlert.congestion}\n\nRecommended action:\n${newAlert.action}`;

    let i = 0;
    const type = () => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 20);
      } else {
        setIsTyping(false);
      }
    };
    if (typingRef.current) clearTimeout(typingRef.current);
    type();
  };

  useEffect(() => {
    runPrediction();
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, []);



  return (
    <section id="chaos" style={{ background: '#0a0a0f', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>🧠 AI Engine</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            ChaosPredictor — Live Demo
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Adjust inputs and watch our AI predict tomorrow's gridlock in real time.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Inputs Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px',
            }}
          >
            <div style={{ fontSize: '14px', color: '#00D4FF', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
              ⚙️ Input Parameters
            </div>

            {/* Sites slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Active Dig Sites</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#FF6B35', fontFamily: 'monospace' }}>{sites}</span>
              </div>
              <input type="range" min={1} max={20} value={sites} onChange={e => setSites(+e.target.value)}
                style={{ width: '100%', accentColor: '#FF6B35', cursor: 'pointer' }} />
            </div>

            {/* Weather */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Tomorrow's Weather</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {weatherOptions.map(w => (
                  <button key={w} onClick={() => setWeather(w)} style={{
                    padding: '8px 14px', borderRadius: '10px', border: '1px solid',
                    borderColor: weather === w ? '#00D4FF' : 'rgba(255,255,255,0.1)',
                    background: weather === w ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.03)',
                    color: weather === w ? '#00D4FF' : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                  }}>{w}</button>
                ))}
              </div>
            </div>

            {/* Zone */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Zone</div>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: '13px', cursor: 'pointer', outline: 'none',
              }}>
                {zones.map(z => <option key={z} value={z} style={{ background: '#1a1a2e' }}>{z}</option>)}
              </select>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {[
                { label: '🏫 School Opening at 8:00 AM', val: schoolOpen, set: setSchoolOpen },
                { label: '🛒 Market Day', val: marketDay, set: setMarketDay },
              ].map(({ label, val, set }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                  <button onClick={() => set(!val)} style={{
                    width: '48px', height: '26px', borderRadius: '13px', border: 'none',
                    background: val ? '#FF6B35' : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
                  }}>
                    <div style={{
                      position: 'absolute', top: '3px', left: val ? '24px' : '3px',
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                      transition: 'left 0.3s',
                    }} />
                  </button>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,107,53,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={runPrediction}
              disabled={isTyping}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF6B35, #cc4a1a)',
                color: '#fff', border: 'none', fontSize: '15px', fontWeight: 700,
                cursor: isTyping ? 'wait' : 'pointer',
                opacity: isTyping ? 0.7 : 1,
              }}
            >
              {isTyping ? '⏳ Predicting...' : '🧠 Run AI Prediction'}
            </motion.button>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            {/* Pulse ring */}
            <div style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '28px',
              border: `2px solid ${alert.color}`,
              opacity: 0.4,
              animation: 'ringPulse 2s infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '-16px',
              borderRadius: '32px',
              border: `1px solid ${alert.color}`,
              opacity: 0.15,
              animation: 'ringPulse 2s infinite 0.5s',
            }} />

            <div style={{
              background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
              border: `1px solid ${alert.color}40`, borderRadius: '20px', padding: '32px',
              height: '100%', position: 'relative', zIndex: 1,
              boxShadow: `0 0 40px ${alert.color}15`,
            }}>
              <div style={{ fontSize: '14px', color: alert.color, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
                📡 AI Prediction Output
              </div>

              <div style={{
                fontFamily: 'monospace', fontSize: '14px', lineHeight: 1.8,
                color: '#e8e8e8', whiteSpace: 'pre-wrap', minHeight: '280px',
              }}>
                {displayText}
                {isTyping && <span style={{ animation: 'blink 0.7s infinite', color: alert.color }}>█</span>}
              </div>

              {!isTyping && displayText && (
                <div style={{
                  marginTop: '24px', padding: '16px',
                  background: `${alert.color}10`, border: `1px solid ${alert.color}30`,
                  borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: alert.color, animation: 'pulse 1.5s infinite',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '12px', color: alert.color, fontWeight: 600 }}>
                    Prediction generated · {new Date().toLocaleTimeString()} · Confidence: 94%
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChaosPredictor;
