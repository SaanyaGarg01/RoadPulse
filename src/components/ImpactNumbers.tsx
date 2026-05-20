import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { end: 2.3, label: 'Citizens Protected', prefix: '', suffix: 'M+', color: '#FF6B35', decimals: 1 },
  { end: 847, label: 'Contractors Tracked', prefix: '', suffix: '', color: '#00D4FF', decimals: 0 },
  { end: 4.2, label: 'Penalties Identified', prefix: '₹', suffix: 'Cr', color: '#00FF88', decimals: 1 },
  { end: 67, label: 'Faster Repair Times', prefix: '', suffix: '%', color: '#FF3355', decimals: 0 },
];

function AnimatedNumber({ end, prefix, suffix, color, decimals }: { end: number; prefix: string; suffix: string; color: string; decimals: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 2500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, decimals]);

  return (
    <div ref={ref} style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, color, fontFamily: 'monospace', lineHeight: 1 }}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </div>
  );
}

const ImpactNumbers: React.FC = () => {
  return (
    <section style={{ background: '#0a0a0f', padding: '140px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(255,107,53,0.06) 0%, rgba(0,212,255,0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Impact</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Numbers That Matter
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            The real-world impact of making cities accountable.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              style={{
                textAlign: 'center', padding: '40px 24px',
                background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
                border: `1px solid ${stat.color}20`, borderRadius: '20px',
                position: 'relative', overflow: 'hidden',
                boxShadow: `0 0 60px ${stat.color}08`,
                transition: 'transform 0.3s ease',
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
                width: '120px', height: '120px', borderRadius: '50%',
                background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
              }} />

              <AnimatedNumber {...stat} />
              <div style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '12px',
                fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px',
              }}>
                {stat.label}
              </div>

              {/* Bottom line */}
              <div style={{
                position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                opacity: 0.4,
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
