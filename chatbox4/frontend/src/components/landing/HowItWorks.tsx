import React from 'react';

const steps = [
  { num: 'Step 1', title: 'Upload Screenshot or Paste Message', desc: 'Simply share a screenshot of a suspicious message or paste the text into our chatbot.', icon: 'fa-arrow-down' },
  { num: 'Step 2', title: 'AI Analyzes Content', desc: 'Our advanced AI model scans the content for known fraud patterns and red flags.', icon: 'fa-arrow-down' },
  { num: 'Step 3', title: 'Detect Suspicious Patterns', desc: 'The system identifies scam indicators like urgent requests, fake numbers, and phishing links.', icon: 'fa-arrow-down' },
  { num: 'Step 4', title: 'Receive Fraud Score', desc: 'Get a clear fraud risk score from 1-100, with detailed reasoning behind the assessment.', icon: 'fa-arrow-down' },
  { num: 'Step 5', title: 'Recommended Action', desc: 'Receive actionable advice on what to do next - report, block, or ignore.', icon: 'fa-flag-checkered' },
];

export const HowItWorks: React.FC = () => (
  <section className="how-section section-padding" id="how-it-works" aria-label="How it works">
    <div className="container">
      <div className="text-center">
        <span className="section-label">How It Works</span>
        <h2 className="section-title">Simple Steps to <span className="highlight">Stay Protected</span></h2>
        <p className="section-subtitle mx-auto">Our AI-powered platform makes fraud detection easy and accessible for everyone.</p>
      </div>
      <div className="timeline">
        {steps.map((step, i) => (
          <div className="timeline-item" key={i}>
            <span className="step-number">{step.num}</span>
            <h4>
              {step.title}
              <span className="arrow-icon"><i className={`fas ${step.icon}`}></i></span>
            </h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
