import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { mapMarkers, type MapMarker, indianCities } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

// Sub-component to handle map center dynamic updates smoothly
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

  const activeCityDetails = indianCities.find(c => c.name === selectedCity) || indianCities[0];

  // Dynamic Map State for centering/zooming
  const [mapCenter, setMapCenter] = useState<[number, number]>([activeCityDetails.lat, activeCityDetails.lng]);
  const [mapZoom, setMapZoom] = useState<number>(13);

  // City Combobox Dropdown States
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');

  // Area Search States
  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  const [isAreaSuggestionsOpen, setIsAreaSuggestionsOpen] = useState(false);

  // Synchronize city center when user selects a new city
  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const cityDetails = indianCities.find(c => c.name === cityName) || indianCities[0];
    setMapCenter([cityDetails.lat, cityDetails.lng]);
    setMapZoom(12); // standard city view zoom
    setSelected(null); // clear open marker details
    setAreaSearchQuery(''); // reset area search
    setIsCityDropdownOpen(false);
    setCitySearchQuery('');
  };

  // Filter markers based on selected city & preset criteria
  const filteredMarkers = mapMarkers.filter(m => {
    if (m.city !== selectedCity) return false;
    if (filter === 'critical') return m.status === 'critical';
    if (filter === 'overdue') return m.overdueDays > 0;
    if (filter === 'schools') return m.nearSchool;
    return true;
  });

  const cityMarkers = mapMarkers.filter(m => m.city === selectedCity);
  
  // Real-time calculated stats for the city
  const activeSites = cityMarkers.filter(m => m.status !== 'repaired').length;
  const overdueMarkers = cityMarkers.filter(m => m.overdueDays > 0);
  const overdueDaysAvg = overdueMarkers.length > 0
    ? Math.round(overdueMarkers.reduce((s, m) => s + m.overdueDays, 0) / overdueMarkers.length)
    : 0;

  // Compute most affected zone dynamically
  const zoneCounts: Record<string, number> = {};
  cityMarkers.forEach(m => {
    if (m.status !== 'repaired') {
      zoneCounts[m.zone] = (zoneCounts[m.zone] || 0) + 1;
    }
  });
  let mostAffected = 'Central Zone';
  let maxCount = 0;
  Object.entries(zoneCounts).forEach(([zone, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostAffected = zone;
    }
  });
  if (maxCount === 0 && activeCityDetails.zones.length > 0) {
    mostAffected = activeCityDetails.zones[0];
  }

  // Filter cities for search combobox
  const filteredCities = indianCities.filter(c =>
    c.name.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  // Filter area suggestions based on typing
  const matchingMarkers = cityMarkers.filter(m => {
    if (!areaSearchQuery.trim()) return false;
    const q = areaSearchQuery.toLowerCase();
    return (
      m.roadName.toLowerCase().includes(q) ||
      m.zone.toLowerCase().includes(q) ||
      m.contractor.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  });

  return (
    <section id="map" style={{ background: '#0a0a0f', padding: '80px 0 0' }}>
      {/* Click-outside backdrop capture overlays */}
      {isCityDropdownOpen && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1005 }}
          onClick={() => setIsCityDropdownOpen(false)}
        />
      )}
      {isAreaSuggestionsOpen && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1005 }}
          onClick={() => setIsAreaSuggestionsOpen(false)}
        />
      )}

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
            {activeCityDetails.description || 'Every active road cut in India, color-coded and live-updated.'}
          </p>

          {/* Premium Glassmorphic Search Deck */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              position: 'relative',
              zIndex: 1020
            }}
          >
            {/* Search & Select City Dropdown */}
            <div style={{ position: 'relative', minWidth: '220px', flex: '1 1 200px' }}>
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <span>🇮🇳 {selectedCity}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', transition: 'transform 0.2s', transform: isCityDropdownOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              {isCityDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    zIndex: 1030,
                    background: 'rgba(10,10,15,0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0,212,255,0.1)',
                    maxHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Filter cities..."
                    value={citySearchQuery}
                    onChange={(e) => setCitySearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '4px' }}>
                    {filteredCities.map(city => (
                      <button
                        key={city.name}
                        onClick={() => handleCityChange(city.name)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          background: selectedCity === city.name ? 'rgba(0,212,255,0.1)' : 'transparent',
                          color: selectedCity === city.name ? '#00D4FF' : 'rgba(255,255,255,0.7)',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span>🇮🇳</span>
                        <span>{city.name}</span>
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <div style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center' }}>
                        No cities found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Search Area or Road */}
            <div style={{ position: 'relative', flex: '2 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type="text"
                  placeholder={`🔍 Search area, road, or contractor in ${selectedCity}...`}
                  value={areaSearchQuery}
                  onChange={(e) => {
                    setAreaSearchQuery(e.target.value);
                    setIsAreaSuggestionsOpen(true);
                  }}
                  onFocus={() => setIsAreaSuggestionsOpen(true)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                {areaSearchQuery && (
                  <button
                    onClick={() => {
                      setAreaSearchQuery('');
                      setIsAreaSuggestionsOpen(false);
                    }}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {isAreaSuggestionsOpen && areaSearchQuery.trim() && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    zIndex: 1030,
                    background: 'rgba(10,10,15,0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    borderRadius: '12px',
                    padding: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255,107,53,0.1)',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  {matchingMarkers.map(marker => (
                    <button
                      key={marker.id}
                      onClick={() => {
                        setSelected(marker);
                        setMapCenter([marker.lat, marker.lng]);
                        setMapZoom(15); // Zoom into the road
                        setIsAreaSuggestionsOpen(false);
                        setAreaSearchQuery(marker.roadName);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'transparent',
                        color: '#fff',
                        fontSize: '13px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontWeight: 600 }}>{marker.roadName}</span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                          📍 {marker.zone} • {marker.contractor}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '100px',
                          background: `${statusColors[marker.status]}20`,
                          color: statusColors[marker.status],
                          border: `1px solid ${statusColors[marker.status]}40`,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {marker.status === 'critical' ? 'Critical' : marker.status === 'partial' ? 'Partial' : marker.status === 'in-progress' ? 'In Progress' : 'Repaired'}
                      </span>
                    </button>
                  ))}
                  {matchingMarkers.length === 0 && (
                    <div style={{ padding: '16px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center' }}>
                      No roads or areas found matching "{areaSearchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
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
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
              zoomControl={false}
            >
              <ChangeView center={mapCenter} zoom={mapZoom} />
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
                  eventHandlers={{
                    click: () => {
                      setSelected(marker);
                      setMapCenter([marker.lat, marker.lng]);
                      setMapZoom(15);
                    }
                  }}
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
