import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Droplet, Sprout, AlertTriangle, FileText, Share2, ArrowLeft, Download, Check } from 'lucide-react';
import pesticides, { getRecommendation } from '../data/pesticides';
import diseases from '../data/diseases';

const AdvisoryPage = ({ language }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pick disease passed from ScanPage or default to first disease
  const passedDisease = location.state?.disease;
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(passedDisease?.id || diseases[0].id);
  const [copied, setCopied] = useState(false);

  const disease = diseases.find(d => d.id === selectedDiseaseId) || passedDisease || diseases[0];
  const adv = getRecommendation(disease.id);

  const handleShareWhatsApp = () => {
    const rawText = 
`ðŸŒ¾ *CropGuard IPM Advisory Report*
----------------------------------------
ðŸ“Œ *Disease:* ${disease.name} (${disease.nameHi})
ðŸŒ± *Crop:* ${disease.crop}
ðŸ¦  *Pathogen:* ${disease.cause}
----------------------------------------
ðŸ’Š *Chemical Control:* ${adv.chemical.name}
ðŸ§ª *Dosage:* ${adv.chemical.dosage}
â³ *Safety Interval (PHI):* ${adv.chemical.safetyInterval}

ðŸŒ¿ *Biological Control:* ${adv.biological.name}
----------------------------------------
ðŸ“± *Get More Advisories on CropGuard App*`;

    const encodedText = encodeURIComponent(rawText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Try opening WhatsApp link
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Clipboard fallback
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadPDF = () => {
    alert(`Downloading official IPM Advisory PDF report for ${disease.name}...`);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="section-header">
        <div>
          <button className="btn btn-secondary btn-sm" style={{ marginBottom: '12px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Back
          </button>
          <h1 className="section-title">Integrated Pest & Disease Management Advisory ðŸ›¡ï¸</h1>
          <p className="section-subtitle">Comprehensive, safe and tailored action plan for Indian farmers & extension staff.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ background: '#25D366', borderColor: '#25D366' }} onClick={handleShareWhatsApp}>
            {copied ? <><Check size={16} /> Opening WhatsApp / Copied!</> : <><Share2 size={16} /> Share via WhatsApp</>}
          </button>
          <button className="btn btn-secondary" onClick={handleDownloadPDF}>
            <Download size={16} /> Download PDF Advisory
          </button>
        </div>
      </div>

      {/* Disease Selector Dropdown */}
      <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>SELECTED DIAGNOSIS ADVISORY:</span>
          <h3 style={{ fontSize: '20px', margin: 0, color: 'var(--primary-light)' }}>{disease.name} ({disease.nameHi})</h3>
        </div>
        <div style={{ minWidth: '220px' }}>
          <label className="form-label" style={{ fontSize: '11px' }}>Switch Advisory Disease:</label>
          <select className="form-select" value={disease.id} onChange={e => setSelectedDiseaseId(e.target.value)}>
            {diseases.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.crop})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Disease Summary Card */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px', borderLeft: `4px solid var(--${disease.severity === 'critical' ? 'danger' : 'warning'})` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>{disease.name} ({disease.crop})</h2>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '14px' }}>
              <strong>Hindi Name:</strong> {disease.nameHi} | <strong>Marathi Name:</strong> {disease.nameMr}
            </div>
          </div>
          <span className={`badge badge-${disease.severity === 'critical' ? 'danger' : 'warning'}`}>
            Severity: {disease.severity}
          </span>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '12px 0' }}>
          <strong>Pathogen:</strong> {disease.cause} | <strong>Favorable Conditions:</strong> {disease.season}
        </div>
        <p style={{ fontSize: '15px', lineHeight: '1.6', background: 'var(--glass)', padding: '12px', borderRadius: '8px' }}>
          <strong>Recognized Symptoms:</strong> {disease.symptoms}
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Chemical Control */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#f87171', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet size={20} /> Chemical Control (Safe Targeted Spray)
          </h3>
          <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text-primary)' }}>{adv.chemical.name}</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>
              <strong>Recommended Dosage:</strong> {adv.chemical.dosage}
            </div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '14px' }}>
              <strong>Application Method:</strong> {adv.chemical.applicationMethod}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', background: 'rgba(245,158,11,0.15)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.3)' }}>
            <AlertTriangle size={20} color="#fbbf24" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#fbbf24', lineHeight: '1.4' }}>
              <strong>Pre-Harvest Safety Interval (PHI):</strong> Do not harvest crop for {adv.chemical.safetyInterval} following spray. Wear protective mask and gloves.
            </span>
          </div>
        </div>

        {/* Biological & Organic Control */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#4ade80', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sprout size={20} /> Eco-Friendly & Organic Control Options
          </h3>
          <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#4ade80' }}>ðŸŒ± Bio-Agent: {adv.biological.name}</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '13px' }}>Dosage: {adv.biological.dosage}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Method: {adv.biological.applicationMethod}</div>
          </div>
          <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#fbbf24' }}>ðŸŒ¿ Organic Formulation: {adv.organic.name}</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '13px' }}>Dosage: {adv.organic.dosage}</div>
          </div>
        </div>
      </div>

      {/* Cultural & IPM Protocol */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ðŸŒ¾ Cultural & Field Sanitation Practices
          </h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {adv.cultural.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}><span style={{ color: 'var(--text-primary)' }}>{item}</span></li>
            ))}
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--primary)" /> Integrated Pest Management (IPM) Steps
          </h3>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '14px' }}>
            {adv.ipmSteps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default AdvisoryPage;


