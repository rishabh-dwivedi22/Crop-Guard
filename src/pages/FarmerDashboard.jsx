import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sun, CloudRain, AlertTriangle, ChevronRight, Activity, ShieldCheck, Cpu, Mic, MapPin, Radio, Zap, Droplet, Shield } from 'lucide-react';
import translations from '../data/translations';

const FarmerDashboard = ({ language, role, onOpenVoice }) => {
  const navigate = useNavigate();
  const t = translations[language] || translations.en;

  if (role !== 'farmer') {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Please switch to Farmer role to view this dashboard.</div>;
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Hero Welcome Banner */}
      <div className="glass-card radar-sweep" style={{ padding: '32px 36px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.1), rgba(17, 24, 39, 0.8))', borderLeft: '5px solid var(--primary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-success">🌐 FARM TELEMETRY LIVE</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>GPS Lock: 26.8467° N, 80.9462° E (Lucknow, UP)</span>
            </div>
            <h1 className="section-title" style={{ fontSize: '32px' }}>
              Namaste, Kisan! 🌾 <span style={{ color: 'var(--primary-light)' }}>Farm Health Center</span>
            </h1>
            <p className="section-subtitle" style={{ fontSize: '15px' }}>
              AI Early Detection • Weather Risk Forecasting • Instant IPM Advisories
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-purple" onClick={onOpenVoice} style={{ flex: '1 1 auto', whiteSpace: 'normal', textAlign: 'center' }}>
              <Mic size={18} /> Awaaz Se Poochein
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/scan')} style={{ flex: '1 1 auto', whiteSpace: 'normal', textAlign: 'center' }}>
              <Camera size={20} /> Launch AI Scanner
            </button>
          </div>
        </div>
      </div>

        {/* Dashboard Grid */}
        <div className="grid-60-40">
          
          {/* Main Health Index */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                FARM HEALTH INDEX
              </h3>
              <div className="badge badge-success"><Shield size={12} /></div>
            </div>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ fontSize: '56px', fontWeight: '900', color: 'var(--primary-light)', fontFamily: 'Outfit', lineHeight: '1' }}>
              92<span style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>/100</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--primary)', marginTop: '6px' }}>
              EXCELLENT CROP VITALITY
            </div>
          </div>

          <div style={{ background: 'var(--glass)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span>Active Risk: <strong>Low (12%)</strong></span>
            <span>Surveillance: <strong>24/7 Satellite</strong></span>
          </div>
        </div>

        {/* Card 2: AI Holographic Diagnostic Launcher */}
        <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(17, 24, 39, 0.8))', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AI DISEASE SCANNER
            </h3>
            <Cpu color="#22d3ee" size={24} />
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Diagnose 38+ diseases using <strong>Photo Upload</strong> or <strong>Symptom Checklist</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-cyan w-full" onClick={() => navigate('/scan')}>
              <Camera size={18} /> Upload Photo or Check Symptoms
            </button>
            <button className="btn btn-secondary w-full" style={{ fontSize: '12px' }} onClick={onOpenVoice}>
              🎙️ Speak Symptoms in Hindi / English
            </button>
          </div>
        </div>

        {/* Card 3: Agro-Climate Microstation */}
        <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--secondary-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                MICROCLIMATE RADAR
              </h3>
              <Sun color="var(--secondary-light)" size={24} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>31°C</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Lucknow, UP</div>
              </div>
              <CloudRain size={44} color="var(--accent-cyan)" />
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '12px', borderRadius: '12px', borderLeft: '4px solid var(--secondary)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AlertTriangle size={20} color="var(--secondary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.3' }}>
              <strong>Humidity 78%:</strong> Spore germination risk active for Potato Late Blight over next 48h.
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Floating Action Grid */}
      <div className="section-header">
        <h3 style={{ fontSize: '20px', margin: 0 }}>Instant Agriculture Command Tools</h3>
      </div>

      <div className="grid-4" style={{ marginBottom: '28px' }}>
        <div className="glass-card" onClick={() => navigate('/scan')} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera color="var(--primary-light)" size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', margin: 0 }}>Camera Scanner</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Instant Photo Diagnosis</span>
          </div>
        </div>

        <div className="glass-card" onClick={() => navigate('/hotspots')} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Radio color="var(--accent-cyan)" size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', margin: 0 }}>GIS Outbreak Map</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Live Hotspot Radar</span>
          </div>
        </div>

        <div className="glass-card" onClick={() => navigate('/advisory')} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-purple-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap color="#a78bfa" size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', margin: 0 }}>IPM Treatment</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Safe Pesticide Dosage</span>
          </div>
        </div>

        <div className="glass-card" onClick={() => navigate('/expert')} style={{ padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck color="var(--secondary-light)" size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', margin: 0 }}>Expert Connect</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>KVK Scientist Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
