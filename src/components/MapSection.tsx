import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { mapMarkers, type MapMarker } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

interface CityConfig {
  name: string;
  coords: [number, number];
  zoom: number;
  description: string;
  mostAffectedZone: string;
}

const cities: Record<string, CityConfig> = {
  Bengaluru: {
    name: 'Bengaluru',
    coords: [12.9716, 77.5946],
    zoom: 13,
    description: 'Silicon Valley under constant pipeline and metro construction surgery.',
    mostAffectedZone: 'East Bengaluru (ORR)',
  },
  Mumbai: {
    name: 'Mumbai',
    coords: [19.0760, 72.8777],
    zoom: 12,
    description: 'Coastal Road construction and metro work arterial blockages.',
    mostAffectedZone: 'Saki Naka Junction & Link Road',
  },
  Delhi: {
    name: 'Delhi NCR',
    coords: [28.6139, 77.2090],
    zoom: 12,
    description: 'Flyover maintenance, stormwater drain widening, and highway digging.',
    mostAffectedZone: 'South Delhi (Ring Road)',
  },
  Hyderabad: {
    name: 'Hyderabad',
    coords: [17.3850, 78.4867],
    zoom: 12,
    description: 'IT Corridor flyovers and underground telecom cabling.',
    mostAffectedZone: 'HITEC City & Gachibowli',
  },
  Chennai: {
    name: 'Chennai',
    coords: [13.0827, 80.2707],
    zoom: 12,
    description: 'Metro rail phase 2 digging and storm drain excavations.',
    mostAffectedZone: 'OMR (IT Expressway)',
  },
  Kolkata: {
    name: 'Kolkata',
    coords: [22.5726, 88.3639],
    zoom: 12,
    description: 'Heritage street renovations and water line surgery.',
    mostAffectedZone: 'Salt Lake Sector V',
  },
  Pune: {
    name: 'Pune',
    coords: [18.5204, 73.8567],
    zoom: 12,
    description: 'Metro line constructions and Hinjawadi IT zone pipeline surgery.',
    mostAffectedZone: 'Hinjawadi IT Park',
  },
};

// Sub-component to handle map center dynamic updates
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

type FilterType = 'all' | 'critical' | 'overdue' | 'schools';

const statusColors: Record<string, string> = {
  critical: '#FF3355',
  partial: '#FF6B35',
  'in-progress': '#FFD700',
  repaired: '#00FF88',
};

const statusLabels: Record<string, string> = {
  critical: '🔴 Critical Blockage',
  partial: '🟠 Partial Blockage',
  'in-progress': '🟡 Dig In Progress',
  repaired: '🟢 Recently Repaired',
};

const MapSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<MapMarker | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');

  const filteredMarkers = mapMarkers.filter(m => {
    if (m.city !== selectedCity) return false;
    if (filter === 'critical') return m.status === 'critical';
    if (filter === 'overdue') return m.overdueDays > 0;
    if (filter === 'schools') return m.nearSchool;
    return true;
  });

  const cityMarkers = mapMarkers.filter(m => m.city === selectedCity);
  const activeSites = cityMarkers.filter(m => m.status !== 'repaired').length;
  const overdueMarkers = cityMarkers.filter(m => m.overdueDays > 0);
  const overdueDaysAvg = overdueMarkers.length > 0
    ? Math.round(overdueMarkers.reduce((s, m) => s + m.overdueDays, 0) / overdueMarkers.length)
    : 0;
  const mostAffected = cities[selectedCity]?.mostAffectedZone || 'Central Zone';

  return (
    <section id="map" style={{ background: '#0a0a0f', padding: '80px 0 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#00D4FF', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>● Live Map</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Real-Time Dig Intelligence
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', marginBottom: '24px' }}>
            {cities[selectedCity]?.description || 'Every active road cut in India, color-coded and live-updated.'}
          </p>

          {/* Premium City Selector */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {Object.keys(cities).map(cityName => (
              <button
                key={cityName}
                onClick={() => {
                  setSelectedCity(cityName);
                  setSelected(null);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '100px',
                  border: '1px solid',
                  borderColor: selectedCity === cityName ? '#00D4FF' : 'rgba(255,255,255,0.08)',
                  background: selectedCity === cityName ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.02)',
                  color: selectedCity === cityName ? '#00D4FF' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  boxShadow: selectedCity === cityName ? '0 0 15px rgba(0,212,255,0.15)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                🇮🇳 {cityName}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
          {(['all', 'critical', 'overdue', 'schools'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '10px 24px', borderRadius: '100px', border: '1px solid',
                borderColor: filter === f ? '#FF6B35' : 'rgba(255,255,255,0.15)',
                background: filter === f ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.04)',
                color: filter === f ? '#FF6B35' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                transition: 'all 0.2s', textTransform: 'capitalize',
              }}
            >
              {f === 'all' ? '🗺 All Sites' : f === 'critical' ? '🔴 Critical' : f === 'overdue' ? '⚠️ Overdue' : '🏫 Near Schools'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', height: '580px' }}>
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: '260px', flexShrink: 0,
              background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
              padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
                Active Sites Today
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#FF3355', fontFamily: 'monospace', lineHeight: 1 }}>
                {activeSites}
              </div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
                Avg Overdue Days
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FF6B35', fontFamily: 'monospace', lineHeight: 1 }}>
                {overdueDaysAvg}
              </div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
                Most Affected Zone
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00D4FF', lineHeight: 1.4 }}>
                {mostAffected}
              </div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            {/* Legend */}
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>
                Legend
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColors[key], flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
            <MapContainer
              center={cities[selectedCity].coords}
              zoom={cities[selectedCity].zoom}
              style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
              zoomControl={false}
            >
              <ChangeView center={cities[selectedCity].coords} zoom={cities[selectedCity].zoom} />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {filteredMarkers.map(marker => (
                <CircleMarker
                  key={marker.id}
                  center={[marker.lat, marker.lng]}
                  radius={marker.status === 'critical' ? 14 : marker.status === 'partial' ? 11 : marker.status === 'in-progress' ? 10 : 8}
                  pathOptions={{
                    color: statusColors[marker.status],
                    fillColor: statusColors[marker.status],
                    fillOpacity: 0.8,
                    weight: 2,
                  }}
                  eventHandlers={{ click: () => setSelected(marker) }}
                />
              ))}
            </MapContainer>

            {/* Popup */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  style={{
                    position: 'absolute', top: '16px', right: '16px', zIndex: 1000,
                    width: '300px',
                    background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
                    border: `1px solid ${statusColors[selected.status]}40`,
                    borderRadius: '16px', padding: '20px',
                    boxShadow: `0 0 30px ${statusColors[selected.status]}20`,
                  }}
                >
                  <button
                    onClick={() => setSelected(null)}
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '18px' }}
                  >×</button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColors[selected.status] }} />
                    <span style={{ fontSize: '11px', color: statusColors[selected.status], fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {statusLabels[selected.status]}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
                    {selected.roadName}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      ['Contractor', selected.contractor],
                      ['Permit Date', selected.permitDate],
                      ['Promised Completion', selected.promisedCompletion],
                      ['Zone', selected.zone],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                        <span style={{ color: '#fff', fontWeight: 600, textAlign: 'right', maxWidth: '160px' }}>{value}</span>
                      </div>
                    ))}
                    {selected.overdueDays > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>Overdue Days</span>
                        <span style={{ color: '#FF3355', fontWeight: 700 }}>⚠️ {selected.overdueDays} days</span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                    {selected.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
