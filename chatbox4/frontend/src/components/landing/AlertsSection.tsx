import React from 'react';

const alerts = [
  { title: 'Fake MTN Promotion', risk: 'High', location: 'Accra', time: '2 hours ago', status: 'active', desc: 'Scammers sending fake MTN rewards messages requesting MoMo PIN.', riskColor: 'var(--primary)' },
  { title: 'SIM Swap Attempt', risk: 'Critical', location: 'Kumasi', time: '5 hours ago', status: 'active', desc: 'Multiple reports of SIM swap attempts targeting mobile money users.', riskColor: 'var(--error)' },
  { title: 'WhatsApp Romance Scam', risk: 'Medium', location: 'Tema', time: '1 day ago', status: 'investigating', desc: 'Fake profiles on WhatsApp asking for money after building trust.', riskColor: 'var(--primary-light)' },
  { title: 'Fake Agent Alert', risk: 'High', location: 'Takoradi', time: '2 days ago', status: 'resolved', desc: 'Individual impersonating MoMo agent to collect cash from customers.', riskColor: 'var(--primary)' },
];

export const AlertsSection: React.FC = () => (
  <section className="alerts-section section-padding" id="alerts" aria-label="Live fraud alerts">
    <div className="container">
      <div className="text-center">
        <span className="section-label">Live Alerts</span>
        <h2 className="section-title">Real-Time <span className="highlight">Fraud Alerts</span></h2>
        <p className="section-subtitle mx-auto">Stay updated with the latest fraud incidents reported across Ghana.</p>
      </div>
      <div className="alerts-dashboard">
        {alerts.map((a, i) => (
          <div className="alert-card fade-up" key={i} style={{ borderLeftColor: a.riskColor }}>
            <div className="top">
              <h4>{a.title}</h4>
              <span className="badge">{a.risk}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: 8 }}>{a.desc}</p>
            <div className="meta">
              <span><i className="fas fa-location-dot"></i> {a.location}</span>
              <span><i className="fas fa-clock"></i> {a.time}</span>
            </div>
            <div className="status">
              <span className={a.status === 'active' ? 'dot' : a.status === 'investigating' ? 'dot safe' : ''}></span>
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
