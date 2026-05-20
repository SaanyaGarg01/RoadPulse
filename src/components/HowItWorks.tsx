import React from 'react';
import { motion } from 'framer-motion';
import { howItWorksSteps } from '../data/mockData';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" style={{ background: '#0a0a0f', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Blueprint grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#00D4FF', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>The System</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            How RoadPulse Works
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>
            From permit to pavement — automated, transparent, and unstoppable.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute', top: '52px', left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, #FF6B35, #00D4FF, #FF6B35, #FF3355)',
            opacity: 0.3,
            display: 'none',
          }} className="connector-line" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: `0 24px 60px ${step.color}20` }}
                style={{
                  background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '32px 28px',
                  position: 'relative', cursor: 'default',
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: '-16px', left: '28px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}aa)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, color: '#fff',
                  boxShadow: `0 0 20px ${step.color}60`,
                }}>
                  {step.step}
                </div>

                {/* Connector arrow (except last) */}
                {i < howItWorksSteps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '50%', right: '-20px',
                    color: step.color, fontSize: '24px', zIndex: 2,
                    transform: 'translateY(-50%)',
                    display: 'none',
                  }} className="step-arrow">→</div>
                )}

                {/* Icon */}
                <div style={{ fontSize: '40px', marginBottom: '16px', marginTop: '8px' }}>{step.icon}</div>

                <div style={{ fontSize: '11px', color: step.color, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Step {step.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div style={{
                  position: 'absolute', bottom: 0, left: '28px', right: '28px', height: '2px',
                  background: `linear-gradient(90deg, ${step.color}, transparent)`,
                  borderRadius: '2px', opacity: 0.5,
                }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <a href="#map" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,107,53,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #cc4a1a)',
                color: '#fff', border: 'none', borderRadius: '14px',
                padding: '18px 48px', fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🚧 See It Live → View the Map
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
