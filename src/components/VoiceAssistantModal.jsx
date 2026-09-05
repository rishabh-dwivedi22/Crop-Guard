import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [statusText, setStatusText] = useState('Tap microphone and speak your problem...');

  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setAiResponse('');
      setStatusText('Tap microphone and speak in Hindi, Marathi, or English...');
    } else {
      // Stop speaking if modal closes
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isOpen]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Recognition. Please use Chrome.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      // Use 'hi-IN' default as it usually auto-detects English and Marathi reasonably well
      recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setAiResponse('');
        setTranscript('');
        setStatusText('Listening... Boliyen (बोलिए)...');
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        setStatusText('Error capturing voice. Please try again.');
        console.error("Speech Recognition Error:", e);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          processRealAIDiagnosis(transcript);
        } else {
          // If state hasn't updated fast enough, grab from recognition object if possible
          // Otherwise prompt user again
          setStatusText('Could not hear clearly. Please tap and try again.');
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      console.error(e);
      setStatusText('Microphone access failed.');
    }
  };

  const processRealAIDiagnosis = async (text) => {
    if (!API_KEY) {
      setStatusText('Please add VITE_GEMINI_API_KEY in .env file to use Real AI!');
      return;
    }

    setStatusText('Thinking... (AI is analyzing your problem)');
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are a highly intelligent agricultural expert AI for Indian farmers. 
      The farmer says: "${text}"
      
      Instructions:
      1. Understand their problem (crop disease, weather, pests, etc.).
      2. Provide a practical, concise solution (MAXIMUM 2 short sentences).
      3. CRITICAL: You MUST reply in the EXACT SAME LANGUAGE the farmer used (Hindi, Marathi, or English). If they used Hinglish, reply in Hindi script or Hinglish.
      4. Return your response as a pure JSON object without markdown formatting, like this:
      {"reply": "your advice here", "langCode": "hi-IN"} 
      (Use hi-IN for Hindi, mr-IN for Marathi, en-IN for English).`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      
      // Clean up markdown code blocks if Gemini returns them
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsedData;
      try {
        parsedData = JSON.parse(cleanJson);
      } catch (err) {
        // Fallback if AI didn't return strict JSON
        parsedData = { reply: cleanJson, langCode: 'hi-IN' };
      }

      setAiResponse(parsedData.reply);
      setStatusText('AI Diagnosis Complete!');

      // Text-to-Speech response
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(parsedData.reply);
        utterance.lang = parsedData.langCode || 'hi-IN';
        
        // Slight customization for voice quality
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setStatusText('Error connecting to AI. Please check internet or API Key.');
    }
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
          <Sparkles size={14} /> REAL AI VOICE ASSISTANT
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Ask Anything (Voice AI)</h2>
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
              🎙️ You Said:
            </div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{transcript}"
            </div>
          </div>
        )}

        {/* AI Real Response */}
        {aiResponse && (
          <div className="animate-slide-up" style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '20px', borderRadius: '16px', border: '1px solid var(--accent-purple)', marginBottom: '24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a78bfa', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
              <Sparkles size={16} /> AI EXPERT ADVICE:
            </div>
            <h3 style={{ fontSize: '18px', color: 'white', margin: 0, lineHeight: '1.5' }}>{aiResponse}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistantModal;
