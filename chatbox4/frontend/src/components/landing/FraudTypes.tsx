import React from 'react';

const frauds = [
  { icon: '🎁', title: 'Fake Promotions', desc: 'Scammers offer fake prizes or discounts to trick you into sending money.', risk: 'High Risk', riskClass: 'high' },
  { icon: '📱', title: 'Fake MTN Messages', desc: 'Impersonating MTN to steal your MoMo PIN or personal information.', risk: 'High Risk', riskClass: 'high' },
  { icon: '🔄', title: 'SIM Swap', desc: 'Fraudsters take over your phone number to access your mobile money.', risk: 'Critical', riskClass: 'high' },
  { icon: '👤', title: 'Fake Agents', desc: 'Impersonating MoMo agents to collect money or personal details.', risk: 'High Risk', riskClass: 'high' },
  { icon: '💸', title: 'Investment Scam', desc: 'Promising high returns to lure you into sending money.', risk: 'Medium Risk', riskClass: 'medium' },
  { icon: '💬', title: 'WhatsApp Scam', desc: 'Fake WhatsApp messages from "friends" or "family" asking for money.', risk: 'High Risk', riskClass: 'high' },
  { icon: '❤️', title: 'Romance Scam', desc: 'Building fake romantic relationships to request money.', risk: 'Medium Risk', riskClass: 'medium' },
  { icon: '💼', title: 'Job Scam', desc: 'Fake job offers requiring payment for application or training.', risk: 'Medium Risk', riskClass: 'medium' },
  { icon: '🏦', title: 'Loan Scam', desc: 'Offering loans with fraudulent upfront fees or fake approval.', risk: 'High Risk', riskClass: 'high' },
  { icon: '📷', title: 'QR Code Scam', desc: 'Fake QR codes that redirect to fraudulent payment pages.', risk: 'Medium Risk', riskClass: 'medium' },
  { icon: '🎣', title: 'Phishing', desc: 'Fake emails or SMS designed to steal your login credentials.', risk: 'High Risk', riskClass: 'high' },
  { icon: '🧠', title: 'Social Engineering', desc: 'Manipulating people into revealing confidential information.', risk: 'High Risk', riskClass: 'high' },
];

export const FraudTypes: React.FC = () => (
  <section className="fraud-section section-padding" id="fraud-types" aria-label="Fraud types">
    <div className="container">
      <div className="text-center">
        <span className="section-label">Fraud Types</span>
        <h2 className="section-title">Know the <span className="highlight">Scams</span></h2>
        <p className="section-subtitle mx-auto">Stay informed about the most common mobile money fraud schemes in Ghana.</p>
      </div>
      <div className="fraud-grid">
        {frauds.map((f, i) => (
          <div className="fraud-card fade-up" key={i} style={{ transitionDelay: `${i * 0.04}s` }}>
            <span className="icon">{f.icon}</span>
            <h5>{f.title}</h5>
            <p>{f.desc}</p>
            <span className={`warning ${f.riskClass}`}>{f.risk}</span>
            <button className="btn btn-outline btn-sm">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
