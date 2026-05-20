import React from 'react';

const Footer: React.FC = () => {
  const skylinePath = `M0,120 L0,200 L1400,200 L1400,120
    L1380,120 L1380,60 L1360,60 L1360,80 L1350,80 L1350,60 L1330,60 L1330,120
    L1310,120 L1310,40 L1290,40 L1290,30 L1280,30 L1280,40 L1270,40 L1270,120
    L1250,120 L1250,70 L1230,70 L1230,50 L1220,50 L1220,70 L1200,70 L1200,120
    L1180,120 L1180,55 L1165,55 L1165,40 L1155,40 L1155,55 L1140,55 L1140,80 L1130,80 L1130,55 L1120,55 L1120,120
    L1100,120 L1100,90 L1080,90 L1080,120
    L1060,120 L1060,35 L1050,25 L1040,35 L1040,120
    L1020,120 L1020,75 L1000,75 L1000,120
    L980,120 L980,50 L965,50 L965,30 L955,30 L955,50 L940,50 L940,120
    L920,120 L920,85 L900,85 L900,65 L885,65 L885,85 L870,85 L870,120
    L850,120 L850,45 L835,45 L835,120
    L815,120 L815,70 L800,70 L800,55 L790,55 L790,70 L775,70 L775,120
    L755,120 L755,95 L735,95 L735,120
    L715,120 L715,40 L700,40 L700,20 L688,20 L688,40 L675,40 L675,120
    L655,120 L655,80 L640,80 L640,120
    L620,120 L620,55 L605,55 L605,35 L595,35 L595,55 L580,55 L580,120
    L560,120 L560,70 L545,70 L545,120
    L525,120 L525,85 L510,85 L510,120
    L490,120 L490,45 L475,45 L475,25 L465,25 L465,45 L450,45 L450,120
    L430,120 L430,65 L415,65 L415,120
    L395,120 L395,50 L380,50 L380,120
    L360,120 L360,80 L345,80 L345,60 L335,60 L335,80 L320,80 L320,120
    L300,120 L300,40 L285,40 L285,25 L275,25 L275,40 L260,40 L260,120
    L240,120 L240,90 L225,90 L225,120
    L205,120 L205,55 L190,55 L190,120
    L170,120 L170,70 L155,70 L155,50 L145,50 L145,70 L130,70 L130,120
    L110,120 L110,85 L95,85 L95,120
    L75,120 L75,45 L60,45 L60,120
    L40,120 L40,80 L25,80 L25,120
    L0,120 Z`;

  const poweredBy = ['Kubernetes', 'React', 'Three.js', 'AI/ML', 'OpenStreetMap', 'Framer Motion'];

  return (
    <footer style={{ background: '#060609', position: 'relative', overflow: 'hidden' }}>
      {/* City skyline SVG */}
      <div style={{ position: 'relative', lineHeight: 0 }}>
        <svg viewBox="0 0 1400 200" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a0a0f" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Grid lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 70} y1="0" x2={i * 70} y2="200" stroke="#00D4FF" strokeWidth="0.5" opacity="0.05" />
          ))}
          {/* Skyline fill */}
          <path d={skylinePath} fill="url(#skylineGrad)" />
          {/* Skyline outline */}
          <path d={skylinePath} fill="none" stroke="#FF6B35" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
          {/* Windows - random dots */}
          {Array.from({ length: 60 }).map((_, i) => (
            <rect key={i}
              x={30 + i * 23 + Math.random() * 10}
              y={50 + Math.random() * 60}
              width="3" height="3"
              fill={i % 3 === 0 ? '#FF6B35' : '#00D4FF'}
              opacity={0.4 + Math.random() * 0.4}
            />
          ))}
        </svg>
      </div>

      <div style={{ background: '#060609', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Top section */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }}>🚧</span>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                    Road<span style={{ color: '#FF6B35' }}>Pulse</span>
                  </span>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    City Intelligence Platform
                  </div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '360px', fontStyle: 'italic' }}>
                "Built for every city that's been dug up and forgotten."
              </p>
              {/* Live badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px',
                background: 'rgba(255,51,85,0.1)', border: '1px solid rgba(255,51,85,0.3)',
                borderRadius: '100px', padding: '6px 14px',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF3355', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '12px', color: '#FF3355', fontWeight: 600 }}>47 Active Sites Right Now</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Platform</div>
              {['Live Map', 'ChaosPredictor', 'ContractorWatch', 'PassableRoute', 'Citizen Reports', 'API Docs'].map(link => (
                <div key={link} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = '#FF6B35'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                  >{link}</a>
                </div>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Company</div>
              {['About Us', 'Press Kit', 'City Partners', 'Municipal API', 'Careers', 'Contact'].map(link => (
                <div key={link} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = '#00D4FF'}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                  >{link}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Powered by */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px', textAlign: 'center' }}>
              Powered by
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {poweredBy.map(tech => (
                <div key={tech} style={{
                  padding: '6px 16px', borderRadius: '100px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500,
                }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
              © 2026 RoadPulse Technologies Pvt. Ltd. · Bengaluru, India
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>
              Making Cities Accountable · One Road at a Time 🚧
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
