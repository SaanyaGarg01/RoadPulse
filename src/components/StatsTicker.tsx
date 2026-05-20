import React from 'react';
import { motion } from 'framer-motion';
import { tickerItems } from '../data/mockData';

const typeColors: Record<string, string> = {
  new: '#FF3355',
  overdue: '#FF6B35',
  repaired: '#00FF88',
  info: '#00D4FF',
};

const StatsTicker: React.FC = () => {
  const repeated = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="stats-ticker" style={{
      background: 'linear-gradient(90deg, #FF6B35 0%, #cc4a1a 100%)',
      borderBottom: '1px solid rgba(255,107,53,0.3)',
      overflow: 'hidden',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#0a0a0f',
        height: '100%',
        flexShrink: 0,
        borderRight: '2px solid #FF6B35',
        gap: '6px',
      }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#FF6B35', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          🔴 LIVE
        </span>
      </div>

      <div style={{ overflow: 'hidden', flex: 1 }}>
        <motion.div
          style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap', willChange: 'transform' }}
          animate={{ x: [0, -2400] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {repeated.map((item, idx) => (
            <span key={idx} style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <span style={{ color: typeColors[item.type] || '#fff', fontWeight: 700 }}>
                {item.type === 'new' ? '●' : item.type === 'overdue' ? '▲' : item.type === 'repaired' ? '✓' : '◆'}
              </span>
              {item.message}
              <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '20px' }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsTicker;
