import React from 'react';

const features = [
  { icon: 'fa-robot', title: 'AI Fraud Chatbot', desc: 'Chat with our intelligent assistant to analyze suspicious messages and get instant fraud advice.' },
  { icon: 'fa-shield-halved', title: 'Fraud Detection', desc: 'Advanced AI algorithms detect fraudulent patterns in messages, calls, and transactions.' },
  { icon: 'fa-envelope-circle-check', title: 'Message Verification', desc: 'Upload screenshots or paste text to verify if a message is legitimate or a scam.' },
  { icon: 'fa-phone', title: 'Phone Number Checker', desc: 'Check if a phone number has been reported for fraud or suspicious activity.' },
  { icon: 'fa-graduation-cap', title: 'Scam Education', desc: 'Learn about the latest scams and how to protect yourself and your loved ones.' },
  { icon: 'fa-truck-fast', title: 'Emergency Help', desc: 'Immediate access to emergency contacts and reporting channels for fraud incidents.' },
  { icon: 'fa-chart-simple', title: 'Fraud Trends', desc: 'Real-time insights into emerging fraud patterns and high-risk areas in Ghana.' },
  { icon: 'fa-flag', title: 'Secure Reporting', desc: 'Report fraud incidents securely and help protect others from the same scams.' },
  { icon: 'fa-bell', title: 'Community Alerts', desc: 'Receive real-time alerts about fraud in your area from the community.' },
];

export const FeaturesSection: React.FC = () => (
  <section className="features-section section-padding" id="features" aria-label="Features">
    <div className="container">
      <div className="text-center">
        <span className="section-label">Features</span>
        <h2 className="section-title">Powerful Tools to <span className="highlight">Keep You Safe</span></h2>
        <p className="section-subtitle mx-auto">Comprehensive fraud detection and prevention tools powered by artificial intelligence.</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card fade-up" key={i} style={{ transitionDelay: `${i * 0.05}s` }}>
            <div className="icon"><i className={`fas ${f.icon}`}></i></div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
