import React from 'react';
import { Camera, LayoutDashboard, FileText, AlertTriangle, Map, Settings } from 'lucide-react';
import translations from '../data/translations';

const Sidebar = ({ role, activeItem, onItemClick }) => {
  const t = translations.en;

  const getLinks = () => {
    switch(role) {
      case 'farmer':
        return [
          { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
          { id: 'scan', icon: Camera, label: t.scanCrop },
          { id: 'advisory', icon: FileText, label: t.advisory },
          { id: 'hotspot-map', icon: Map, label: 'Hotspot Map' },
          { id: 'alerts', icon: AlertTriangle, label: t.alerts },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ];
      case 'expert':
        return [
          { id: 'verification', icon: FileText, label: 'Queue' },
          { id: 'hotspot-map', icon: Map, label: 'Map' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ];
      case 'officer':
        return [
          { id: 'officer-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'hotspot-map', icon: Map, label: 'Hotspot Map' },
          { id: 'officer-alerts', icon: AlertTriangle, label: 'Alerts' },
          { id: 'settings', icon: Settings, label: 'Settings' },
        ];
      default: return [];
    }
  };

  return (
    <aside className="app-sidebar">
      {getLinks().map(link => (
        <button
          key={link.id}
          onClick={() => onItemClick(link.id)}
          style={{
            background: activeItem === link.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: activeItem === link.id ? 'var(--primary-light)' : 'var(--text-secondary)',
            borderColor: activeItem === link.id ? 'var(--primary)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <link.icon size={18} />
          <span>{link.label}</span>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
