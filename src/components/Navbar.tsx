import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Live Map', href: '#map' },
    { label: 'Features', href: '#features' },
    { label: 'AI Predictor', href: '#chaos' },
    { label: 'Contractors', href: '#leaderboard' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        padding: '0 24px',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '28px' }}>🚧</span>
        <div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            Road<span style={{ color: '#FF6B35' }}>Pulse</span>
          </span>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1 }}>
            City Intelligence
          </div>
        </div>
      </a>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
        {links.map(link => (
          <a key={link.href} href={link.href} style={{
            padding: '8px 16px', borderRadius: '8px', fontSize: '14px',
            color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
            fontWeight: 500, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00FF88', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: '12px', color: '#00FF88', fontWeight: 600 }}>47 Live Sites</span>
        </div>
        <motion.a
          href="#map"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'linear-gradient(135deg, #FF6B35, #cc4a1a)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '9px 20px', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
          }}
        >
          View Live Map →
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
