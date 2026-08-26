import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import hotspots from '../data/hotspots';

const HotspotMap = () => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      default: return '#10b981';
    }
  };

  return (
    <div className="glass-card" style={{ height: '450px', width: '100%', overflow: 'hidden', position: 'relative' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📍 Live GIS Disease & Pest Hotspot Map
        </h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span> Critical</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span> High</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></span> Medium</span>
        </div>
      </div>
      
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '390px', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {hotspots.map((spot) => (
          <CircleMarker
            key={spot.id}
            center={[spot.lat, spot.lng]}
            radius={spot.reportCount / 3 + 6}
            pathOptions={{
              color: getSeverityColor(spot.severity),
              fillColor: getSeverityColor(spot.severity),
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Popup>
              <div style={{ color: '#000', padding: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#111' }}>{spot.district}, {spot.state}</h4>
                <p style={{ margin: '4px 0 2px', fontWeight: 'bold', color: '#d97706' }}>Disease: {spot.disease}</p>
                <p style={{ margin: 0, fontSize: '12px' }}>Crop: {spot.cropAffected}</p>
                <p style={{ margin: 0, fontSize: '12px' }}>Reports: {spot.reportCount} cases</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotspotMap;
