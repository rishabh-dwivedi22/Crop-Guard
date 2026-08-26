import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, Check } from 'lucide-react';
import './ImageUploader.css';

const STEPS = ['Resizing', 'Enhancing', 'Normalizing', 'Analyzing'];

const ImageUploader = ({ onImageSelect, isProcessing = false, processingStep = 0 }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      onImageSelect && onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const removePreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="uploader-wrapper">
      {!preview ? (
        <div
          className={`upload-zone ${dragging ? 'dragging' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="upload-icon-wrap">
            <Camera size={32} />
          </div>
          <h3>Upload or Drag Crop Image</h3>
          <p>Supports JPG, PNG, WEBP – max 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="upload-input"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="upload-preview">
          <img src={preview} alt="Crop preview" />
          {!isProcessing && (
            <button className="preview-remove" onClick={removePreview}>
              <X size={16} />
            </button>
          )}

          {isProcessing && (
            <div className="processing-overlay">
              <div className="pulse-rings">
                <div className="pulse-ring" />
                <div className="pulse-ring" />
                <div className="pulse-ring" />
              </div>
              <div className="processing-text">Analyzing crop image…</div>
              <div className="processing-steps">
                {STEPS.map((step, i) => (
                  <span
                    key={step}
                    className={`proc-step ${
                      i === processingStep ? 'active' : i < processingStep ? 'done' : ''
                    }`}
                  >
                    {i < processingStep && <Check size={10} style={{ marginRight: 4 }} />}
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
