import React from 'react';

const stats = [
  { icon: 'fa-message', count: '125,430+', label: 'Messages Analyzed' },
  { icon: 'fa-shield-halved', count: '28,700+', label: 'Users Protected' },
  { icon: 'fa-coins', count: 'GHS 5.2M+', label: 'Money Saved' },
  { icon: 'fa-flag', count: '3,850+', label: 'Scams Reported' },
];

const trends = [
  { label: 'SIM Swap', percentage: 85, color: 'var(--error)' },
  { label: 'Fake Promotions', percentage: 72, color: 'var(--primary)' },
  { label: 'Phishing', percentage: 64, color: 'var(--primary-light)' },
  { label: 'Romance Scam', percentage: 48, color: 'var(--accent)' },
];

export const AnalyticsSection: React.FC = () => (
  <section className="analytics-section section-padding" id="analytics" aria-label="Analytics">
    <div className="container">
      <div className="text-center">
        <span className="section-label">Analytics</span>
        <h2 className="section-title">Fraud Protection <span className="highlight">By the Numbers</span></h2>
        <p className="section-subtitle mx-auto">Real-time impact data showing how FraudShield AI is protecting communities across Ghana.</p>
      </div>

      <div className="analytics-grid">
        {stats.map((s, i) => (
          <div className="analytics-stat fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="icon"><i className={`fas ${s.icon}`}></i></div>
            <div className="count">{s.count}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="analytics-trends">
        <h3 className="trends-title">Most Reported Scam Types</h3>
        <div className="trends-bars">
          {trends.map((t, i) => (
            <div className="trend-bar-item fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="trend-bar-label">
                <span>{t.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-color)' }}>{t.percentage}%</span>
              </div>
              <div className="trend-bar-track">
                <div className="trend-bar-fill" style={{ width: `${t.percentage}%`, background: t.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
