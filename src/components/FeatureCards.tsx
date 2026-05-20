import React, { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '⛏️',
    title: 'DigSite Tracker',
    subtitle: 'Real-Time Excavation Mapping',
    description: 'Every active road cut mapped in real time using construction permits + citizen reports. Zero blind spots across the city.',
    color: '#FF6B35',
    stats: '47 Live Sites',
  },
  {
    icon: '🧠',
    title: 'ChaosPredictor',
    subtitle: 'AI-Powered Gridlock Forecasting',
    description: 'AI predicts gridlock 24hrs before it happens by combining dig sites, school timings, weather, and event data.',
    color: '#00D4FF',
    stats: '94% Accuracy',
  },
  {
    icon: '🧭',
    title: 'PassableRoute',
    subtitle: 'Smart Alternate Routing',
    description: 'Real-time routing that knows which half-lanes are dug, which are bike-only, and which are completely blocked.',
    color: '#00FF88',
    stats: '23K Hours Saved',
  },
  {
    icon: '📋',
    title: 'ContractorWatch',
    subtitle: 'Public Accountability Dashboard',
    description: 'Every contractor. Every deadline. Every overdue day — visible to the public. Accountability that cannot be hidden.',
    color: '#FF3355',
    stats: '847 Tracked',
  },
];

const FeatureCard: React.FC<{ feature: typeof features[0]; index: number }> = ({ feature, index }) => {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const y = (e.clientX - rect.left - rect.width / 2) / rect.width;
    setRotation({ x: x * -12, y: y * 12 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          transform: hovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-8px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0)',
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? feature.color + '60' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px',
          padding: '36px 32px',
          height: '100%',
          boxShadow: hovered ? `0 20px 60px ${feature.color}20, 0 0 0 1px ${feature.color}20` : '0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: `radial-gradient(circle, ${feature.color}15, transparent 70%)`,
          transition: 'opacity 0.3s',
          opacity: hovered ? 1 : 0,
        }} />

        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
          background: `linear-gradient(135deg, transparent 50%, ${feature.color}10 100%)`,
          borderRadius: '0 20px 0 0',
        }} />

        {/* Icon */}
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}10)`,
          border: `1px solid ${feature.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', marginBottom: '24px',
          boxShadow: hovered ? `0 0 20px ${feature.color}30` : 'none',
          transition: 'box-shadow 0.3s',
        }}>
          {feature.icon}
        </div>

        {/* Stats badge */}
        <div style={{
          position: 'absolute', top: '28px', right: '28px',
          background: `${feature.color}15`, border: `1px solid ${feature.color}30`,
          borderRadius: '100px', padding: '4px 12px',
          fontSize: '11px', fontWeight: 700, color: feature.color,
          letterSpacing: '0.5px',
        }}>
          {feature.stats}
        </div>

        <div style={{ fontSize: '11px', color: feature.color, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          {feature.subtitle}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          {feature.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '0.95rem' }}>
          {feature.description}
        </p>

        {/* Bottom line */}
        <div style={{
          marginTop: '28px', height: '2px', borderRadius: '2px',
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.3s',
        }} />

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: feature.color, fontWeight: 600 }}>Explore feature</span>
          <span style={{ color: feature.color, fontSize: '14px', transition: 'transform 0.2s', transform: hovered ? 'translateX(4px)' : 'none' }}>→</span>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCards: React.FC = () => {
  return (
    <section id="features" style={{ background: '#0a0a0f', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Platform Features</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Four Pillars of City Intelligence
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            A complete operating system for urban construction oversight — from permit to pavement.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
