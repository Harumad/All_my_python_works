import React, { useState, useRef } from 'react';

export const ScreenshotAnalysis: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (!preview) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      const results = [
        'No fraud indicators detected. The message appears legitimate.',
        'Suspicious patterns detected: urgent request for personal information.',
        'High fraud risk! This message contains multiple scam indicators.',
        'Analysis complete: This is a known phishing attempt.',
      ];
      setResult(results[Math.floor(Math.random() * results.length)]);
    }, 2500);
  };

  const handleClear = () => {
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <section className="screenshot-section section-padding" id="screenshot-analysis" aria-label="Screenshot analysis">
      <div className="container">
        <div className="text-center">
          <span className="section-label">Analyze</span>
          <h2 className="section-title">Upload Screenshot <span className="highlight">for Analysis</span></h2>
          <p className="section-subtitle mx-auto">Upload a screenshot of a suspicious message and let our AI analyze it for fraud indicators.</p>
        </div>

        {!preview ? (
          <div
            className="upload-area"
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
            onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <i className="fas fa-cloud-upload-alt"></i>
            <p><strong>Click or drag & drop</strong> a screenshot here</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Supports JPG, PNG, WEBP (max 5MB)</p>
            <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>Choose File</button>
          </div>
        ) : (
          <div className={`preview-container${preview ? ' show' : ''}`}>
            <img src={preview} alt="Uploaded screenshot preview" />
            <div className="actions">
              <button className="btn btn-primary" onClick={handleAnalyze} disabled={analyzing}>
                <i className="fas fa-microchip"></i> {analyzing ? 'Analyzing...' : 'Analyze'}
              </button>
              <button className="btn btn-outline" onClick={handleClear}><i className="fas fa-times"></i> Clear</button>
            </div>
            {(analyzing || result) && (
              <div className={`analysis-result${analyzing || result ? ' show' : ''}`}>
                {analyzing && <div className="spinner active"></div>}
                {result && <p style={{ fontWeight: 600, color: 'var(--text-color)' }}>{result}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
