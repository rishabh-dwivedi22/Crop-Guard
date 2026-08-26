import React, { useState, useEffect } from 'react';
import { Leaf, Bell, Mic, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import translations from '../data/translations';

const Navbar = ({ role, onRoleChange, language, onLangChange, notifications, onClearNotifications, onOpenVoice }) => {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert("📱 Phone Par Install Karne Ke Liye:\n\nChrome Browser ke top-right 3 DOTS (⋮) par click karein aur 'Add to Home Screen' ya 'Install App' tap karein!");
    }
  };

  return (
    <>
      {/* Top Live Satellite Telemetry Ticker (Hidden on Mobile via CSS) */}
      <div className="live-ticker">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div className="ticker-pulse"></div>
          <span style={{ color: 'var(--primary-light)', fontFamily: 'JetBrains Mono' }}>ISRO-SENTINEL 2A LIVE</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          🌐 Real-Time Agro-GIS Radar Active | 🌾 14,280 Indian Farms Scanned Today | ⚠️ High Late Blight Risk Warning Issued for UP & Maharashtra
        </div>
      </div>

      <nav className="navbar">
        {/* Brand Logo */}
        <div 
          className="nav-brand" 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <div style={{ 
            width: '38px', height: '38px', borderRadius: '10px', 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px var(--primary-glow)', flexShrink: 0 
          }}>
            <Leaf color="white" size={20} />
          </div>
          <div>
            <div style={{ fontSize: '19px', fontWeight: '900', fontFamily: 'Outfit', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              Crop<span style={{ color: 'var(--primary-light)' }}>Guard</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Voice Assistant Icon Button */}
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={onOpenVoice}
            title="Awaaz Se Poochein (Voice Assistant)"
            style={{ borderColor: 'var(--accent-purple)', color: '#a78bfa', background: 'rgba(139,92,246,0.15)', padding: '6px 10px' }}
          >
            <Mic size={14} /> <span className="mobile-hide-text">Voice</span>
          </button>

          {/* Role Selector Pill */}
          <div style={{ display: 'flex', background: 'rgba(17,24,39,0.9)', borderRadius: '16px', padding: '2px', border: '1px solid var(--glass-border)' }}>
            {['farmer', 'expert', 'officer'].map(r => (
              <button 
                key={r}
                onClick={() => onRoleChange(r)}
                style={{
                  padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                  background: role === r ? 'var(--primary)' : 'transparent',
                  color: role === r ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer', border: 'none'
                }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1, 3)}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <button 
            className="btn-icon"
            onClick={() => onLangChange(language === 'en' ? 'hi' : (language === 'hi' ? 'mr' : 'en'))}
            title="Switch Language (EN / हिं / मरा)"
            style={{ width: '34px', height: '34px', fontSize: '11px', fontWeight: 'bold' }}
          >
            {language === 'en' ? 'EN' : language === 'hi' ? 'हिं' : 'मरा'}
          </button>

          {/* Notifications Bell */}
          <button 
            className="btn-icon" 
            style={{ width: '34px', height: '34px', position: 'relative', cursor: 'pointer' }}
            onClick={() => {
              if (onClearNotifications) onClearNotifications();
              navigate('/alerts');
            }}
            title="View Alerts"
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span style={{
                position: 'absolute', top: '-2px', right: '-2px',
                background: 'var(--danger)', color: 'white', fontSize: '9px',
                width: '15px', height: '15px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {notifications}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
