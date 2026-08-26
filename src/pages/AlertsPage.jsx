import React, { useState } from 'react';
import { AlertTriangle, CloudRain, ShieldAlert, Info, Bell, CheckCircle, Filter, Send, MessageSquare, Check } from 'lucide-react';

const initialAlerts = [
  { 
    id: 'a1', 
    title: 'Critical Weather Warning: High Humidity & Rainfall Spikes', 
    category: 'weather', 
    severity: 'critical', 
    location: 'Nashik & Pune, Maharashtra', 
    time: '10 mins ago', 
    unread: true,
    description: 'Relative humidity exceeds 85% for 48 consecutive hours. Immediate preventive fungicide spray recommended for Potato and Tomato crops against Late Blight.'
  },
  { 
    id: 'a2', 
    title: 'Brown Plant Hopper (BPH) Hopperburn Outbreak', 
    category: 'pest', 
    severity: 'critical', 
    location: 'Godavari Delta, Andhra Pradesh', 
    time: '1 hour ago', 
    unread: true,
    description: 'Pest density surpassed 25 nymphs per hill in paddy fields. Alternate wetting & drying (AWD) and targeted stem drenching recommended.'
  },
  { 
    id: 'a3', 
    title: 'Yellow Rust Surveillance Alert', 
    category: 'disease', 
    severity: 'high', 
    location: 'Ludhiana & Patiala, Punjab', 
    time: '3 hours ago', 
    unread: true,
    description: 'Favorable cool night temperatures and morning dew detected. Farmers growing HD-2967 wheat variety advised to inspect lower canopy.'
  },
  { 
    id: 'a4', 
    title: 'Pink Bollworm Trap Threshold Exceeded', 
    category: 'pest', 
    severity: 'high', 
    location: 'Rajkot & Kutch, Gujarat', 
    time: '5 hours ago', 
    unread: false,
    description: 'Pheromone traps recorded 12+ male moths/trap/night for 3 consecutive nights in flowering cotton crops.'
  },
  { 
    id: 'a5', 
    title: 'Extension Advisory Broadcast: Seed Treatment Drive', 
    category: 'advisory', 
    severity: 'info', 
    location: 'Pan-India Agricultural Districts', 
    time: '1 day ago', 
    unread: false,
    description: 'Free Trichoderma viride bio-control kits available at local Krishi Vigyan Kendra (KVK) centers.'
  }
];

const AlertsPage = ({ role }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState('all');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [sharedAlertId, setSharedAlertId] = useState(null);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const markSingleRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, unread: false } : a));
  };

  const handleShareAlertWhatsApp = (e, alertItem) => {
    e.stopPropagation();
    const rawText = 
`🚨 *CropGuard Field Alert Broadcast*
----------------------------------------
⚠️ *Warning:* ${alertItem.title}
📍 *Location:* ${alertItem.location}
🕒 *Time:* ${alertItem.time}
----------------------------------------
📝 *Advisory:* ${alertItem.description}
----------------------------------------
📱 *Sent via CropGuard Farmer Network*`;

    const encodedText = encodeURIComponent(rawText);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    setSharedAlertId(alertItem.id);
    setTimeout(() => setSharedAlertId(null), 3000);
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return a.unread;
    return a.category === activeTab;
  });

  const unreadCount = alerts.filter(a => a.unread).length;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Field Risk Alerts & Advisory Bulletins 🔔</h1>
          <p className="section-subtitle">Real-time automated hazard warnings, microclimate alerts and extension broadcasts.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllRead}>
              <CheckCircle size={16} /> Mark All Read ({unreadCount})
            </button>
          )}
          {role === 'officer' && (
            <button className="btn btn-primary" onClick={() => setShowBroadcastModal(true)}>
              <Send size={16} /> Broadcast Emergency Alert
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="glass-card" style={{ padding: '12px 20px', marginBottom: '24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[
          { id: 'all', label: `All Alerts (${alerts.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'weather', label: '🌦️ Weather Risks' },
          { id: 'disease', label: '🦠 Disease Outbreaks' },
          { id: 'pest', label: '🐛 Pest Infestations' },
          { id: 'advisory', label: '📢 Extension Bulletins' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold',
              background: activeTab === tab.id ? 'var(--primary)' : 'var(--glass)',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--glass-border)', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredAlerts.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Bell size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
            <h3>No alerts in this category</h3>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className="glass-card" 
              onClick={() => markSingleRead(alert.id)}
              style={{ 
                padding: '24px', 
                borderLeft: `5px solid var(--${alert.severity === 'critical' ? 'danger' : (alert.severity === 'high' ? 'warning' : 'info')})`,
                background: alert.unread ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                transition: 'all 0.2s ease', cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {alert.severity === 'critical' ? <ShieldAlert color="#f87171" size={24} /> : 
                   alert.severity === 'high' ? <AlertTriangle color="#fbbf24" size={24} /> : <Info color="#60a5fa" size={24} />}
                  <h3 style={{ fontSize: '18px', margin: 0 }}>{alert.title}</h3>
                  {alert.unread && <span className="badge badge-critical" style={{ fontSize: '10px' }}>NEW</span>}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{alert.time}</span>
              </div>

              <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6', marginTop: '8px', marginBottom: '12px' }}>
                {alert.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)', paddingTop: '10px' }}>
                <span>📍 <strong>Target Area:</strong> {alert.location}</span>
                <button 
                  className="btn btn-secondary btn-sm" 
                  style={{ fontSize: '11px', color: '#25D366', borderColor: 'rgba(37,211,102,0.3)' }}
                  onClick={(e) => handleShareAlertWhatsApp(e, alert)}
                >
                  {sharedAlertId === alert.id ? <><Check size={12} /> Opening WhatsApp...</> : <><MessageSquare size={12} /> Share via WhatsApp</>}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Modal for Officers */}
      {showBroadcastModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card animate-scale-in" style={{ width: '100%', maxWidth: '500px', padding: '32px', background: 'var(--bg-secondary)' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>Broadcast Farmers Alert</h2>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Alert Title</label>
              <input className="form-input" placeholder="e.g. Pest Swarm Approaching District" />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Severity Level</label>
              <select className="form-select">
                <option value="critical">Critical Warning (Red Alert)</option>
                <option value="high">High Caution (Yellow Alert)</option>
                <option value="info">Advisory / Information</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Message Details</label>
              <textarea className="form-input" rows="3" placeholder="Enter actionable guidance for farmers..."></textarea>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { alert('Emergency alert broadcasted via SMS & App notification!'); setShowBroadcastModal(false); }}>
                Broadcast Now
              </button>
              <button className="btn btn-secondary" onClick={() => setShowBroadcastModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
