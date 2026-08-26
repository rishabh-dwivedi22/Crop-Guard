import React, { useState } from 'react';
import HotspotMap from '../components/HotspotMap';
import hotspots from '../data/hotspots';
import indianStatesAndDistricts from '../data/locations';
import { Filter, MapPin, AlertTriangle, ShieldCheck, PlusCircle } from 'lucide-react';

const HotspotPage = () => {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState('All');
  const [showReportModal, setShowReportModal] = useState(false);

  const states = ['All', ...Object.keys(indianStatesAndDistricts)];
  const diseases = ['All', 'Late Blight', 'Early Blight', 'Rice Blast', 'Brown Plant Hopper', 'Yellow Rust', 'Pink Bollworm', 'Citrus Canker'];

  const filteredHotspots = hotspots.filter(h => {
    if (selectedState !== 'All' && h.state !== selectedState) return false;
    if (selectedSeverity !== 'All' && h.severity !== selectedSeverity) return false;
    if (selectedDisease !== 'All' && h.disease !== selectedDisease) return false;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Geospatial Hotspot Mapping & Outbreak Tracking 🗺️</h1>
          <p className="section-subtitle">Real-time GIS surveillance across all Indian agricultural zones.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowReportModal(true)}>
          <PlusCircle size={18} /> Field Report Outbreak
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
          <Filter size={18} /> Filters:
        </div>

        <div style={{ display: 'flex', gap: '12px', flex: 1, flexWrap: 'wrap' }}>
          <div style={{ minWidth: '160px' }}>
            <select className="form-select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
              <option value="All">All States ({states.length - 1})</option>
              {states.slice(1).map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <div style={{ minWidth: '160px' }}>
            <select className="form-select" value={selectedSeverity} onChange={e => setSelectedSeverity(e.target.value)}>
              <option value="All">All Severities</option>
              <option value="critical">Critical Outbreaks</option>
              <option value="high">High Risk</option>
              <option value="medium">Moderate Risk</option>
            </select>
          </div>

          <div style={{ minWidth: '160px' }}>
            <select className="form-select" value={selectedDisease} onChange={e => setSelectedDisease(e.target.value)}>
              {diseases.map(d => <option key={d} value={d}>{d === 'All' ? 'All Diseases & Pests' : d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredHotspots.length}</strong> active hotspots
        </div>
      </div>

      {/* Main Map */}
      <div style={{ marginBottom: '24px' }}>
        <HotspotMap />
      </div>

      {/* Hotspots Breakdown List */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Active Regional Hotspot Registry</h3>
        <div className="grid-3">
          {filteredHotspots.map(spot => (
            <div key={spot.id} className="glass-card" style={{ padding: '16px', background: 'var(--glass)', borderLeft: `4px solid var(--${spot.severity === 'critical' ? 'danger' : (spot.severity === 'high' ? 'warning' : 'info')})` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '16px', margin: 0 }}>{spot.district}, {spot.state}</h4>
                <span className={`badge badge-${spot.severity === 'critical' ? 'danger' : (spot.severity === 'high' ? 'warning' : 'info')}`}>
                  {spot.severity}
                </span>
              </div>
              <div style={{ color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '14px' }}>{spot.disease}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Crop: {spot.cropAffected} | Reports: {spot.reportCount} cases
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Report Modal */}
      {showReportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card animate-scale-in" style={{ width: '100%', maxWidth: '500px', padding: '32px', background: 'var(--bg-secondary)' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>Report Field Outbreak</h2>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">State</label>
              <select className="form-select">
                {Object.keys(indianStatesAndDistricts).map(st => <option key={st}>{st}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Disease / Pest</label>
              <input className="form-input" placeholder="e.g. Stem Borer" />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Estimated Affected Area (Hectares)</label>
              <input className="form-input" type="number" placeholder="50" />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { alert('Outbreak report submitted to central GIS registry!'); setShowReportModal(false); }}>Submit Report</button>
              <button className="btn btn-secondary" onClick={() => setShowReportModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotspotPage;
