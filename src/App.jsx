import React, { useState, useCallback, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import VoiceAssistantModal from './components/VoiceAssistantModal'
import FarmerDashboard from './pages/FarmerDashboard'
import ScanPage from './pages/ScanPage'
import ExpertPortal from './pages/ExpertPortal'
import OfficerDashboard from './pages/OfficerDashboard'
import AdvisoryPage from './pages/AdvisoryPage'
import AlertsPage from './pages/AlertsPage'
import HotspotPage from './pages/HotspotPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

export const AppContext = createContext()

function App() {
  const [role, setRole] = useState('farmer') // 'farmer' | 'expert' | 'officer'
  const [language, setLanguage] = useState('en') // 'en' | 'hi' | 'mr'
  const [notifications, setNotifications] = useState(5)
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname === '/alerts') {
      setNotifications(0)
    }
  }, [location.pathname])

  const handleRoleChange = useCallback((newRole) => {
    setRole(newRole)
    if (newRole === 'farmer') navigate('/')
    else if (newRole === 'expert') navigate('/expert')
    else if (newRole === 'officer') navigate('/officer')
  }, [navigate])

  const handleNavClick = useCallback((item) => {
    const routeMap = {
      'dashboard': '/',
      'scan': '/scan',
      'advisory': '/advisory',
      'alerts': '/alerts',
      'reports': '/alerts',
      'verification': '/expert',
      'reviewed': '/expert',
      'analytics': '/officer',
      'officer-dashboard': '/officer',
      'hotspot-map': '/hotspots',
      'officer-reports': '/officer',
      'officer-alerts': '/alerts',
      'settings': '/settings',
    }
    navigate(routeMap[item] || '/')
  }, [navigate])

  const getActiveItem = () => {
    const path = location.pathname
    if (path === '/') return 'dashboard'
    if (path === '/scan') return 'scan'
    if (path === '/advisory') return 'advisory'
    if (path === '/alerts') return role === 'officer' ? 'officer-alerts' : 'alerts'
    if (path === '/expert') return 'verification'
    if (path === '/officer') return 'officer-dashboard'
    if (path === '/hotspots') return 'hotspot-map'
    if (path === '/settings') return 'settings'
    return 'dashboard'
  }

  const contextValue = {
    role,
    language,
    setLanguage,
    setRole: handleRoleChange,
    notifications,
    setNotifications,
    openVoiceAssistant: () => setIsVoiceOpen(true),
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        <Navbar
          role={role}
          onRoleChange={handleRoleChange}
          language={language}
          onLangChange={setLanguage}
          notifications={notifications}
          onClearNotifications={() => setNotifications(0)}
          onOpenVoice={() => setIsVoiceOpen(true)}
        />
        <div className="app-layout">
          <Sidebar
            role={role}
            activeItem={getActiveItem()}
            onItemClick={handleNavClick}
          />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<FarmerDashboard language={language} role={role} onOpenVoice={() => setIsVoiceOpen(true)} />} />
              <Route path="/scan" element={<ScanPage language={language} role={role} />} />
              <Route path="/expert" element={<ExpertPortal language={language} role={role} />} />
              <Route path="/officer" element={<OfficerDashboard language={language} role={role} />} />
              <Route path="/hotspots" element={<HotspotPage language={language} role={role} />} />
              <Route path="/settings" element={<SettingsPage language={language} onLangChange={setLanguage} />} />
              <Route path="/advisory" element={<AdvisoryPage language={language} role={role} />} />
              <Route path="/alerts" element={<AlertsPage language={language} role={role} />} />
            </Routes>
          </main>
        </div>

        {/* Global Voice Assistant Modal */}
        <VoiceAssistantModal 
          isOpen={isVoiceOpen} 
          onClose={() => setIsVoiceOpen(false)} 
        />
      </div>
    </AppContext.Provider>
  )
}

export default App
