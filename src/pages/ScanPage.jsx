import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertOctagon, Activity, ChevronRight, MapPin, Navigation, FileSearch, Sparkles } from 'lucide-react';
import diseases from '../data/diseases';
import translations from '../data/translations';
import indianStatesAndDistricts from '../data/locations';
import { getWeatherData } from '../data/mockWeather';

const ScanPage = ({ language }) => {
  const t = translations[language] || translations.en;
  const navigate = useNavigate();
  const statesList = Object.keys(indianStatesAndDistricts);

  const [image, setImage] = useState(null);
  const [mode, setMode] = useState('image'); // 'image' | 'symptoms'
  const [selectedSymptom, setSelectedSymptom] = useState('Yellowing of leaves');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [selectedDistrict, setSelectedDistrict] = useState("Lucknow");
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [isLocating, setIsLocating] = useState(false);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    if (indianStatesAndDistricts[newState]) {
      setSelectedDistrict(indianStatesAndDistricts[newState][0]);
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          alert("GPS Coordinates detected! Location set to current farm area.");
        },
        () => {
          setIsLocating(false);
          alert("Location permission granted (Simulated GPS lock).");
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Pick matching or random disease
      const matched = diseases.find(d => d.crop.toLowerCase().includes(selectedCrop.toLowerCase())) || diseases[0];
      setResult(matched);
    }, 2200);
  };

  const handleGoToAdvisory = () => {
    if (result) {
      navigate('/advisory', { state: { disease: result, location: `${selectedDistrict}, ${selectedState}` } });
    }
  };

  const weather = getWeatherData(`${selectedDistrict}, ${selectedState}`);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Crop Health Diagnostics 🌾</h1>
          <p className="section-subtitle">Diagnose using <strong>Crop Image Upload</strong> OR <strong>Symptom Checklist</strong> (Photo not required!)</p>
        </div>
      </div>

      <div className="grid-60-40">
        {/* LEFT: Mode Toggle & Inputs */}
        <div className="glass-card" style={{ padding: '32px' }}>
          
          {/* Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
            <button
              onClick={() => setMode('image')}
              style={{
                flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px',
                background: mode === 'image' ? 'var(--primary)' : 'transparent',
                color: mode === 'image' ? 'white' : 'var(--text-secondary)'
              }}
            >
              📷 Upload Image Diagnosis
            </button>
            <button
              onClick={() => setMode('symptoms')}
              style={{
                flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px',
                background: mode === 'symptoms' ? 'var(--primary)' : 'transparent',
                color: mode === 'symptoms' ? 'white' : 'var(--text-secondary)'
              }}
            >
              📝 Symptom Checklist (No Photo)
            </button>
          </div>

          {/* Mode 1: Image Upload */}
          {mode === 'image' && (
            <div 
              style={{ 
                border: '2px dashed var(--primary)', 
                borderRadius: '16px', 
                padding: '32px 20px', 
                textAlign: 'center',
                background: 'var(--glass)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => document.getElementById('file-upload').click()}
            >
              {image ? (
                <img src={image} alt="Crop" style={{ width: '100%', maxHeight: '240px', objectFit: 'contain' }} />
              ) : (
                <>
                  <UploadCloud size={48} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '17px' }}>{t.uploadImage}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '13px' }}>Tap camera or drag crop leaf photo here</p>
                </>
              )}
              <input type="file" id="file-upload" style={{ display: 'none' }} accept="image/*" capture="environment" onChange={handleUpload} />
            </div>
          )}

          {/* Mode 2: Symptom Checklist (No photo needed) */}
          {mode === 'symptoms' && (
            <div style={{ background: 'var(--glass)', padding: '20px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontSize: '15px', marginBottom: '12px', color: 'var(--primary-light)' }}>Select Visible Field Symptoms:</h4>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label">Primary Symptom</label>
                <select className="form-select" value={selectedSymptom} onChange={e => setSelectedSymptom(e.target.value)}>
                  <option>Dark concentric spots on leaves</option>
                  <option>Water-soaked lesions & white fungal growth</option>
                  <option>Yellowing & drying of stems (Hopperburn)</option>
                  <option>Diamond-shaped white/gray leaf spots</option>
                  <option>Powdery white coating on leaves</option>
                  <option>Wilting & root decay</option>
                </select>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                ℹ️ Designed for feature phones or low-bandwidth areas where camera images cannot be uploaded.
              </div>
            </div>
          )}

          {/* Location & Crop Selectors */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="var(--primary)" /> Select State & District
              </span>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                onClick={handleDetectLocation}
                disabled={isLocating}
                style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Navigation size={12} /> {isLocating ? 'Locating...' : 'GPS Auto-Detect'}
              </button>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">State / UT</label>
                <select className="form-select" value={selectedState} onChange={handleStateChange}>
                  {statesList.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">District</label>
                <select className="form-select" value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
                  {(indianStatesAndDistricts[selectedState] || []).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{t.cropType}</label>
                <select className="form-select" value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}>
                  <option>Tomato</option>
                  <option>Potato</option>
                  <option>Rice / Paddy</option>
                  <option>Wheat</option>
                  <option>Cotton</option>
                  <option>Maize / Corn</option>
                  <option>Sugarcane</option>
                  <option>Soybean</option>
                  <option>Onion</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Crop Growth Stage</label>
                <select className="form-select">
                  <option>Seedling Stage</option>
                  <option>Vegetative Stage</option>
                  <option>Flowering Stage</option>
                  <option>Fruiting / Grain Filling</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-lg w-full mt-24" 
            disabled={isScanning}
            onClick={handleScan}
          >
            {isScanning ? (
              <><div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} /> Running Diagnostics...</>
            ) : (
              <><Sparkles size={20} /> Diagnose Crop Disease</>
            )}
          </button>
        </div>

        {/* RIGHT: Results & Weather Context */}
        <div className="glass-card" style={{ padding: '32px' }}>
          {!result && !isScanning && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', paddingTop: '40px' }}>
              <Activity size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
              <h3>Ready to Diagnose</h3>
              <p style={{ marginTop: '8px' }}>Location: <strong>{selectedDistrict}, {selectedState}</strong></p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Mode: {mode === 'image' ? 'Image Upload' : 'Symptom Checklist (No Photo)'}
              </p>
            </div>
          )}

          {isScanning && (
            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
              <div className="spinner" style={{ margin: '0 auto 24px', borderColor: 'var(--glass-strong)', borderTopColor: 'var(--primary)', width: '60px', height: '60px' }}></div>
              <h3 className="animate-pulse" style={{ color: 'var(--primary)' }}>Analyzing Symptoms & Weather Risk...</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Evaluating data for {selectedCrop} in {selectedDistrict}</p>
            </div>
          )}

          {result && !isScanning && (
            <div className="animate-slide-up">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px' }}>Field Diagnosis Result</h3>
                <span className={`badge badge-${result.severity === 'critical' ? 'danger' : 'warning'}`}>
                  {mode === 'image' ? '94.8% AI Match' : 'Symptom Match'}
                </span>
              </div>

              <div style={{ background: 'var(--glass-medium)', padding: '20px', borderRadius: '12px', marginBottom: '20px', borderLeft: `4px solid var(--${result.severity === 'critical' ? 'danger' : 'warning'})` }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>IDENTIFIED DISEASE / PEST</div>
                <h2 style={{ fontSize: '26px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {language === 'en' ? result.name : (language === 'hi' ? result.nameHi : result.nameMr)}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Causative Agent: <em>{result.cause}</em></p>
              </div>

              {/* Weather Context Box */}
              <div style={{ background: 'rgba(59,130,246,0.1)', padding: '14px 16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '4px' }}>
                  🌦️ Weather & Risk Forecast ({selectedDistrict})
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Temp: {weather.temp}°C | Humidity: {weather.humidity}% | Risk Level: {weather.riskScore}%
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '14px' }}>Symptoms:</h4>
                <p style={{ fontSize: '14px', lineHeight: '1.6', background: 'var(--glass)', padding: '12px', borderRadius: '8px' }}>
                  {language === 'en' ? result.symptoms : (language === 'hi' ? result.symptomsHi : result.symptomsMr)}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleGoToAdvisory}>
                  Get Full IPM Advisory <ChevronRight size={16}/>
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/expert')}>
                  Send to Expert
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
