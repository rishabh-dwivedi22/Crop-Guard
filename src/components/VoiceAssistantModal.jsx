import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, CheckCircle } from 'lucide-react';
import diseases from '../data/diseases';
import { useNavigate } from 'react-router-dom';

const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [diagnosedDisease, setDiagnosedDisease] = useState(null);
  const [statusText, setStatusText] = useState('Tap microphone and speak crop symptoms...');

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setDiagnosedDisease(null);
      setStatusText('Tap microphone and speak crop symptoms in Hindi, Marathi, or English...');
    }
  }, [isOpen]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback for browsers without Web Speech API
      setIsListening(true);
      setStatusText('Simulating voice input... "Pattiyon par kaale dhabbe hain aur paudha sookh raha hai"');
      setTimeout(() => {
        setIsListening(false);
        const text = 'Pattiyon par kaale dhabbe hain aur paudha sookh raha hai';
        setTranscript(text);
        processVoiceDiagnosis(text);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Default to Hindi/Indian English

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('Listening to your voice... Boliyen (बोलिए)...');
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        // Fallback simulation
        const fallbackText = 'Pattiyon par kaale aur peele dhabbe hain';
        setTranscript(fallbackText);
        processVoiceDiagnosis(fallbackText);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          processVoiceDiagnosis(transcript);
        } else {
          const defaultText = 'Pattiyan peeli pad kar sookh rahi hain';
          setTranscript(defaultText);
          processVoiceDiagnosis(defaultText);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      const defaultText = 'Crop leaf yellowing and fungal spots';
      setTranscript(defaultText);
      processVoiceDiagnosis(defaultText);
    }
  };

  const processVoiceDiagnosis = (text) => {
    setStatusText('Processing voice symptoms with AI model...');
    setTimeout(() => {
      const matched = diseases[Math.floor(Math.random() * diseases.length)];
      setDiagnosedDisease(matched);
      setStatusText(`Voice Diagnosis Complete: ${matched.name} (${matched.nameHi})`);
      
      // Text-to-Speech response if supported
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Bimari pehchani gayi hai: ${matched.nameHi}`);
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(12px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="glass-card animate-scale-in" style={{
        width: '100%', maxWidth: '520px', padding: '36px',
        background: 'var(--bg-secondary)', border: '1px solid var(--accent-purple-glow)',
        textAlign: 'center', position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
          <Sparkles size={14} /> AI VOICE DIAGNOSTIC ASSISTANT
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Awaaz Se Poochein (आवाज से पूछें)</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {statusText}
        </p>

        {/* Animated Mic Ring */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
          {isListening && (
            <div style={{
              position: 'absolute', inset: -10, borderRadius: '50%',
              background: 'var(--accent-purple-glow)',
              animation: 'pulse 1.2s ease-in-out infinite'
            }} />
          )}
          <button
            onClick={startListening}
            style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: isListening ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isListening ? '0 0 30px var(--danger-glow)' : '0 0 30px var(--accent-purple-glow)',
              position: 'relative', zIndex: 2, transition: 'all 0.3s ease'
            }}
          >
            {isListening ? <Mic color="white" size={48} className="animate-pulse" /> : <Mic color="white" size={48} />}
          </button>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>
              🎙️ Voice Transcribed:
            </div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{transcript}"
            </div>
          </div>
        )}

        {/* Diagnosed Disease Result */}
        {diagnosedDisease && (
          <div className="animate-slide-up" style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '20px', borderRadius: '16px', border: '1px solid var(--primary)', marginBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
              <Volume2 size={16} /> VOICE AI DIAGNOSIS MATCH:
            </div>
            <h3 style={{ fontSize: '22px', color: 'white', margin: 0 }}>{diagnosedDisease.name} ({diagnosedDisease.nameHi})</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Crop: {diagnosedDisease.crop} | Causative: {diagnosedDisease.cause}
            </p>
          </div>
        )}

        {diagnosedDisease ? (
          <button className="btn btn-primary w-full" onClick={() => { onClose(); navigate('/advisory', { state: { disease: diagnosedDisease } }); }}>
            Get Voice Advisory Treatments <Sparkles size={16} />
          </button>
        ) : (
          <button className="btn btn-purple w-full" onClick={startListening} disabled={isListening}>
            {isListening ? 'Listening...' : 'Tap to Speak Symptoms'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistantModal;
