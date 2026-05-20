import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Animated city grid
function CityGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = clock.getElapsedTime() * 0.02;
    }
  });

  const lineData = React.useMemo(() => {
    const size = 30;
    const divisions = 20;
    const step = size / divisions;
    const allPoints: THREE.Vector3[] = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = -size / 2 + i * step;
      // Horizontal
      allPoints.push(new THREE.Vector3(-size / 2, pos, 0));
      allPoints.push(new THREE.Vector3(size / 2, pos, 0));
      // Vertical
      allPoints.push(new THREE.Vector3(pos, -size / 2, 0));
      allPoints.push(new THREE.Vector3(pos, size / 2, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(allPoints);
    return geometry;
  }, []);

  return (
    <group ref={gridRef}>
      <lineSegments geometry={lineData}>
        <lineBasicMaterial color="#00D4FF" opacity={0.15} transparent />
      </lineSegments>
    </group>
  );
}

// Pulsing dig site markers
function DigSiteMarker({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() + delay;
      const scale = 1 + 0.6 * Math.sin(t * 2);
      meshRef.current.scale.setScalar(scale);
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 2));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.18, 8, 8]} />
      <meshBasicMaterial color="#FF3355" transparent opacity={0.8} />
    </mesh>
  );
}

// Floating data particles
function DataParticles() {
  const count = 120;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const t = clock.getElapsedTime();
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += 0.008;
        if (pos[i * 3 + 1] > 14) pos[i * 3 + 1] = -14;
        pos[i * 3] += Math.sin(t + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geo = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geo}>
      <pointsMaterial color="#FF6B35" size={0.08} transparent opacity={0.6} />
    </points>
  );
}

// Active site markers positions
const digSites: [number, number, number][] = [
  [2.5, 3.1, 0.1], [-4.2, 1.8, 0.1], [6.1, -2.3, 0.1],
  [-1.8, -5.4, 0.1], [4.7, 6.2, 0.1], [-6.3, 4.1, 0.1],
  [8.2, -0.9, 0.1], [-3.1, 7.5, 0.1], [1.2, -7.8, 0.1],
  [-7.4, -3.2, 0.1], [5.5, -5.5, 0.1], [0.3, 9.1, 0.1],
];

const HeroSection: React.FC = () => {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0a0a0f' }}>
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <CityGrid />
          <DataParticles />
          {digSites.map((pos, i) => (
            <DigSiteMarker key={i} position={pos} delay={i * 0.4} />
          ))}
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 70%, rgba(10,10,15,1) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to top, #0a0a0f, transparent)',
      }} />

      {/* Hero Content */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 24px', textAlign: 'center',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '24px',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B35', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Live City Intelligence Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            color: '#fff',
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          Your City Is{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FF6B35, #FF3355)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Under Surgery.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '680px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          <strong style={{ color: '#00D4FF' }}>RoadPulse</strong> tracks every road cut, predicts every chaos, holds every contractor accountable — in real time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}
        >
          <a href="#map" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,107,53,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #cc4a1a)',
                color: '#fff', border: 'none', borderRadius: '12px',
                padding: '16px 36px', fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.5px',
              }}
            >
              🗺️ View Live Map
            </motion.button>
          </a>
          <a href="#how-it-works" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                color: '#00D4FF', border: '2px solid #00D4FF', borderRadius: '12px',
                padding: '16px 36px', fontSize: '1rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.5px',
              }}
            >
              ⚡ See How It Works
            </motion.button>
          </a>
        </motion.div>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex', gap: '0', flexWrap: 'wrap', justifyContent: 'center',
            background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Active Dig Sites', value: 47, color: '#FF3355' },
            { label: 'Roads Blocked Today', value: 12, color: '#FF6B35' },
            { label: 'Contractors Overdue', value: 8, color: '#FF6B35' },
            { label: 'Hours Saved', value: 23000, color: '#00FF88' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px 32px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color, fontFamily: 'monospace' }}>
                {stat.value.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', zIndex: 10,
        }}
      >
        <div style={{ marginBottom: '6px' }}>SCROLL</div>
        <div style={{ fontSize: '18px' }}>↓</div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
