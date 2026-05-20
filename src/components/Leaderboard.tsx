import React from 'react';
import { motion } from 'framer-motion';
import { contractors } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const sorted = [...contractors].sort((a, b) => a.score - b.score);

  const getRowColor = (score: number) => {
    if (score < 35) return { bg: 'rgba(255,51,85,0.08)', border: 'rgba(255,51,85,0.2)' };
    if (score < 60) return { bg: 'rgba(255,107,53,0.06)', border: 'rgba(255,107,53,0.15)' };
    if (score >= 80) return { bg: 'rgba(0,255,136,0.06)', border: 'rgba(0,255,136,0.15)' };
    return { bg: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.06)' };
  };

  const getScoreColor = (score: number) => {
    if (score < 35) return '#FF3355';
    if (score < 60) return '#FF6B35';
    if (score >= 80) return '#00FF88';
    return '#FFD700';
  };

  return (
    <section id="leaderboard" style={{ background: '#0a0a0f', padding: '120px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(255,51,85,0.1)', border: '1px solid rgba(255,51,85,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#FF3355', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>📋 Public Dashboard</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            ContractorWatch
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Because accountability shouldn't be optional. Every contractor. Every deadline. Every overdue day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1.5fr',
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['Contractor', 'Roads Dug', 'On Time', 'Overdue', 'Overdue Days', 'Compliance Score'].map(h => (
              <div key={h} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((c, i) => {
            const rowStyle = getRowColor(c.score);
            const scoreColor = getScoreColor(c.score);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ background: 'rgba(255,255,255,0.04)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1.5fr',
                  padding: '18px 24px',
                  background: rowStyle.bg,
                  borderBottom: `1px solid ${rowStyle.border}`,
                  alignItems: 'center',
                  cursor: 'default',
                }}
              >
                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {c.isWorstOffender && <span style={{ fontSize: '14px' }}>🔴</span>}
                  {c.score >= 85 && <span style={{ fontSize: '14px' }}>⭐</span>}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{c.name}</div>
                    {c.isWorstOffender && (
                      <div style={{ fontSize: '10px', color: '#FF3355', fontWeight: 600, letterSpacing: '0.5px' }}>⚠ WORST OFFENDER</div>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', fontWeight: 600 }}>{c.roadsDug}</div>
                <div style={{ fontSize: '14px', color: '#00FF88', fontFamily: 'monospace', fontWeight: 600 }}>{c.onTime}</div>
                <div style={{ fontSize: '14px', color: '#FF3355', fontFamily: 'monospace', fontWeight: 600 }}>{c.overdue}</div>
                <div style={{ fontSize: '14px', color: c.overdueDays > 20 ? '#FF3355' : c.overdueDays > 0 ? '#FF6B35' : '#00FF88', fontFamily: 'monospace', fontWeight: 600 }}>
                  {c.overdueDays > 0 ? `+${c.overdueDays}d` : '—'}
                </div>

                {/* Score bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: scoreColor, fontFamily: 'monospace' }}>{c.score}/100</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                      {c.score >= 85 ? 'Excellent' : c.score >= 60 ? 'Fair' : c.score >= 35 ? 'Poor' : 'Critical'}
                    </span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      style={{ height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}aa)` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginTop: '24px' }}
        >
          {[
            { label: 'Total Contractors', value: contractors.length, color: '#00D4FF' },
            { label: 'Worst Offenders', value: contractors.filter(c => c.isWorstOffender).length, color: '#FF3355' },
            { label: 'Compliant (Score ≥80)', value: contractors.filter(c => c.score >= 80).length, color: '#00FF88' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '20px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, fontFamily: 'monospace' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard;
