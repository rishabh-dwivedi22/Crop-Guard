import React, { useState } from 'react';
import { Settings, Sliders, Bell, Globe, Shield, Save, Check } from 'lucide-react';

const SettingsPage = ({ language, onLangChange }) => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [weatherSensitivity, setWeatherSensitivity] = useState('High');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [offlineModel, setOfflineModel] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">System Settings & Configuration ⚙️</h1>
          <p className="section-subtitle">Customize AI thresholds, alert channels, offline modes and language preferences.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save Settings</>}
        </button>
      </div>

      <div className="grid-2">
        {/* AI & Model Settings */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="var(--primary)" /> AI Model & Diagnostics Sensitivity
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label className="form-label">AI Confidence Threshold</label>
              <span style={{ fontWeight: 'bold', color: 'var(--primary-light)' }}>{confidenceThreshold}%</span>
            </div>
            <input 
              type="range" 
              min="60" 
              max="95" 
              value={confidenceThreshold} 
              onChange={e => setConfidenceThreshold(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Diagnoses below {confidenceThreshold}% confidence will automatically trigger expert review routing.
            </p>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Weather Risk Sensitivity</label>
            <select className="form-select" value={weatherSensitivity} onChange={e => setWeatherSensitivity(e.target.value)}>
              <option value="High">High (Early Warning on 70%+ Humidity)</option>
              <option value="Medium">Medium (Standard Outbreak Thresholds)</option>
              <option value="Conservative">Conservative (Confirmed Outbreaks Only)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--glass)', borderRadius: '10px' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Edge Offline Model Mode</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Use lightweight TensorFlow.js model in low-connectivity areas</div>
            </div>
            <input 
              type="checkbox" 
              checked={offlineModel} 
              onChange={e => setOfflineModel(e.target.checked)}
              style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Notifications & Language */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--secondary)" /> Notifications & Localization
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--glass)', borderRadius: '10px' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>WhatsApp Outbreak Alerts</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Receive advisory broadcasts on registered mobile number</div>
              </div>
              <input 
                type="checkbox" 
                checked={whatsappAlerts} 
                onChange={e => setWhatsappAlerts(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--glass)', borderRadius: '10px' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>SMS Emergency Warnings</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Direct SMS for critical pest hopperburn & blight warnings</div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={e => setSmsAlerts(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

          <h4 style={{ fontSize: '15px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={18} /> Preferred Display Language
          </h4>
          <div className="grid-3">
            <button 
              className={`btn ${language === 'en' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onLangChange && onLangChange('en')}
            >
              English
            </button>
            <button 
              className={`btn ${language === 'hi' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onLangChange && onLangChange('hi')}
            >
              हिन्दी (Hindi)
            </button>
            <button 
              className={`btn ${language === 'mr' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onLangChange && onLangChange('mr')}
            >
              मराठी (Marathi)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
