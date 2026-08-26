import React, { useState } from 'react';
import { CheckCircle, XCircle, Edit3, User, Clock, AlertCircle, ShieldCheck, Filter, Send, MessageSquare, Check, Sparkles, AlertTriangle } from 'lucide-react';
import diseases from '../data/diseases';

const initialQueue = [
  { 
    id: 'CASE-101', 
    farmer: 'Ramprasad Yadav', 
    district: 'Lucknow', 
    state: 'Uttar Pradesh', 
    crop: 'Tomato', 
    symptoms: 'Dark concentric target spots on lower leaves with yellow halos.',
    aiDiagnosis: 'Early Blight', 
    confidence: '94.2%', 
    severity: 'warning',
    status: 'pending', 
    time: '12 mins ago',
    expertNote: ''
  },
  { 
    id: 'CASE-102', 
    farmer: 'Suresh Patil', 
    district: 'Nashik', 
    state: 'Maharashtra', 
    crop: 'Potato', 
    symptoms: 'Rapid leaf wilting, water-soaked brown lesions with white fungal fuzz underneath.',
    aiDiagnosis: 'Late Blight', 
    confidence: '89.5%', 
    severity: 'danger',
    status: 'pending', 
    time: '35 mins ago',
    expertNote: ''
  },
  { 
    id: 'CASE-103', 
    farmer: 'Venkatesh Rao', 
    district: 'Guntur', 
    state: 'Andhra Pradesh', 
    crop: 'Rice / Paddy', 
    symptoms: 'Stems drying up at ground level (Hopperburn), brownish insect colonies.',
    aiDiagnosis: 'Brown Plant Hopper', 
    confidence: '96.1%', 
    severity: 'danger',
    status: 'pending', 
    time: '1 hour ago',
    expertNote: ''
  },
  { 
    id: 'CASE-104', 
    farmer: 'Harpreet Singh', 
    district: 'Ludhiana', 
    state: 'Punjab', 
    crop: 'Wheat', 
    symptoms: 'Yellow stripe-like pustules on leaves in patches.',
    aiDiagnosis: 'Yellow Rust', 
    confidence: '91.0%', 
    severity: 'warning',
    status: 'confirmed', 
    time: '3 hours ago',
    expertNote: 'Confirmed. Advised immediate Propiconazole spray.'
  }
];

const ExpertPortal = () => {
  const [queue, setQueue] = useState(initialQueue);
  const [selectedCaseId, setSelectedCaseId] = useState('CASE-101');
  const [activeTab, setActiveTab] = useState('pending');
  const [isModifying, setIsModifying] = useState(false);
  const [modifiedDisease, setModifiedDisease] = useState(diseases[0].name);
  const [expertNote, setExpertNote] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const selectedCase = queue.find(c => c.id === selectedCaseId) || queue[0];

  const handleConfirm = () => {
    setQueue(queue.map(c => c.id === selectedCase.id ? { 
      ...c, 
      status: 'confirmed', 
      expertNote: expertNote || 'Confirmed by Extension Pathologist.' 
    } : c));
    setFeedbackSuccess('AI Diagnosis Confirmed! Model positive feedback logged.');
    setTimeout(() => setFeedbackSuccess(false), 3000);
  };

  const handleModifySubmit = () => {
    setQueue(queue.map(c => c.id === selectedCase.id ? { 
      ...c, 
      status: 'modified', 
      aiDiagnosis: `${modifiedDisease} (Overridden)`,
      expertNote: expertNote || `Corrected pathogen tag to ${modifiedDisease}.` 
    } : c));
    setIsModifying(false);
    setFeedbackSuccess(`Diagnosis modified to "${modifiedDisease}"! Continuous learning weights updated.`);
    setTimeout(() => setFeedbackSuccess(false), 3000);
  };

  const filteredQueue = queue.filter(c => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Expert Diagnostic Verification Portal 🔬</h1>
          <p className="section-subtitle">Krishi Vigyan Kendra (KVK) Scientist & Extension Officer Validation Console</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span className="badge badge-success" style={{ fontSize: '12px' }}>
            <ShieldCheck size={14} /> Model Accuracy: 96.4%
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="glass-card" style={{ padding: '12px 20px', marginBottom: '24px', display: 'flex', gap: '10px' }}>
        {[
          { id: 'pending', label: `Pending Queue (${queue.filter(q => q.status === 'pending').length})` },
          { id: 'confirmed', label: `Confirmed (${queue.filter(q => q.status === 'confirmed').length})` },
          { id: 'modified', label: `Modified (${queue.filter(q => q.status === 'modified').length})` },
          { id: 'all', label: `All Cases (${queue.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold',
              background: activeTab === tab.id ? 'var(--primary)' : 'var(--glass)',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {feedbackSuccess && (
        <div className="animate-fade-in" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--primary)', padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', color: '#34d399', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle size={20} /> {feedbackSuccess}
        </div>
      )}

      {/* Main Review Layout */}
      <div className="grid-60-40">
        
        {/* Left: Queue List */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Field Submissions List</h3>
          
          {filteredQueue.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
              No cases in this queue.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredQueue.map(c => (
                <div 
                  key={c.id}
                  onClick={() => { setSelectedCaseId(c.id); setIsModifying(false); }}
                  style={{
                    padding: '18px', borderRadius: '14px',
                    background: selectedCase?.id === c.id ? 'rgba(16, 185, 129, 0.15)' : 'var(--glass)',
                    border: selectedCase?.id === c.id ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{c.crop} - {c.aiDiagnosis}</span>
                      <span className={`badge badge-${c.status === 'pending' ? 'warning' : (c.status === 'confirmed' ? 'success' : 'info')}`} style={{ fontSize: '10px' }}>
                        {c.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      👤 {c.farmer} ({c.district}, {c.state}) • 🕒 {c.time}
                    </div>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary-light)' }}>
                    {c.confidence}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Detailed Case Review Panel */}
        {selectedCase && (
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>Review #{selectedCase.id}</h3>
              <span className={`badge badge-${selectedCase.status === 'pending' ? 'warning' : (selectedCase.status === 'confirmed' ? 'success' : 'info')}`}>
                Status: {selectedCase.status.toUpperCase()}
              </span>
            </div>

            {/* Crop Illustration Frame */}
            <div style={{ 
              width: '100%', height: '180px', borderRadius: '14px', 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px dashed var(--primary)', marginBottom: '20px'
            }}>
              <LeafVisualizer />
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '8px' }}>
                {selectedCase.crop} Leaf Sample ({selectedCase.farmer})
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Location: {selectedCase.district}, {selectedCase.state}
              </div>
            </div>

            {/* AI Diagnosis Metrics Box */}
            <div style={{ background: 'var(--glass-medium)', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>AI PATHOGEN TAG</span>
                <div style={{ fontWeight: 'bold', fontSize: '17px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedCase.aiDiagnosis}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>MODEL CONFIDENCE</span>
                <div style={{ fontWeight: 'bold', fontSize: '17px', color: 'var(--primary-light)', marginTop: '2px' }}>
                  {selectedCase.confidence}
                </div>
              </div>
            </div>

            {/* Symptoms Description */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>FARMER REPORTED SYMPTOMS:</span>
              <div style={{ fontSize: '14px', background: 'var(--glass)', padding: '12px', borderRadius: '8px', marginTop: '4px', lineHeight: '1.5' }}>
                "{selectedCase.symptoms}"
              </div>
            </div>

            {/* Modify Diagnosis Selector (If modifying active) */}
            {isModifying && (
              <div style={{ background: 'rgba(245,158,11,0.15)', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--secondary)' }}>
                <label className="form-label" style={{ color: 'var(--secondary-light)', marginBottom: '6px' }}>Select Correct Pathogen Tag:</label>
                <select 
                  className="form-select" 
                  value={modifiedDisease} 
                  onChange={e => setModifiedDisease(e.target.value)}
                  style={{ marginBottom: '12px' }}
                >
                  {diseases.map(d => <option key={d.id} value={d.name}>{d.name} ({d.crop})</option>)}
                </select>
                <button className="btn btn-warning btn-sm w-full" onClick={handleModifySubmit}>
                  Apply Pathogen Override
                </button>
              </div>
            )}

            {/* Expert Remarks Input */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Scientist Remarks & Field Prescription</label>
              <textarea 
                className="form-input" 
                rows="3" 
                placeholder="Enter expert advice for farmer and local KVK extension worker..." 
                value={expertNote}
                onChange={e => setExpertNote(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }} 
                onClick={handleConfirm}
              >
                <CheckCircle size={18} /> Confirm AI Diagnosis
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ borderColor: 'var(--secondary)', color: 'var(--secondary-light)' }} 
                onClick={() => setIsModifying(!isModifying)}
              >
                <Edit3 size={18} /> {isModifying ? 'Cancel Edit' : 'Modify Tag'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LeafVisualizer = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

export default ExpertPortal;
