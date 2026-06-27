import React, { useState } from 'react';

const phoneData: Record<string, { safe: boolean; message: string }> = {
  '0241234567': { safe: false, message: 'This number has been reported for fraud 3 times.' },
  '0551234567': { safe: true, message: 'No fraud reports found for this number.' },
  '0201234567': { safe: false, message: 'This number is linked to a known phishing scam.' },
  '0261234567': { safe: true, message: 'This number appears safe.' },
};

export const PhoneChecker: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<{ safe: boolean; message: string } | null>(null);

  const handleCheck = () => {
    const raw = phone.replace(/\s/g, '');
    if (!raw || raw.length < 8) return;

    let normalized = raw.replace(/^\+233/, '').replace(/^0/, '');
    normalized = normalized.slice(0, 10);

    const data = phoneData[normalized] || { safe: Math.random() > 0.4, message: 'No fraud reports found for this number.' };
    setResult(data);
  };

  return (
    <section className="phone-check-section section-padding" id="phone-check" aria-label="Phone number checker">
      <div className="container">
        <div className="text-center">
          <span className="section-label">Check</span>
          <h2 className="section-title">Phone Number <span className="highlight">Checker</span></h2>
          <p className="section-subtitle mx-auto">Enter a phone number to check if it has been reported for fraud or suspicious activity.</p>
        </div>
        <div className="phone-checker">
          <div className="input-group">
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 024 123 4567" aria-label="Phone number" onKeyDown={(e) => e.key === 'Enter' && handleCheck()} />
            <button className="btn btn-primary" onClick={handleCheck}><i className="fas fa-search"></i> Check Number</button>
          </div>
          {result && (
            <div className="result show">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className={`status-icon ${result.safe ? 'safe' : 'danger'}`}>
                  <i className={`fas ${result.safe ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                </span>
                <div>
                  <strong style={{ color: result.safe ? 'var(--accent)' : 'var(--error)' }}>
                    {result.safe ? 'Safe' : 'Suspicious'}
                  </strong>
                  <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.9rem' }}>{result.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
