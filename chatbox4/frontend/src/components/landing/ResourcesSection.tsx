import React from 'react';

const resources = [
  { icon: '📹', title: 'Video Guides', desc: 'Watch short videos on how to identify and avoid common scams.' },
  { icon: '📄', title: 'Articles', desc: 'In-depth articles on fraud prevention and mobile money safety.' },
  { icon: '🛡️', title: 'Safety Tips', desc: 'Quick tips to protect your mobile money and personal information.' },
];

export const ResourcesSection: React.FC = () => (
  <section className="resources-section section-padding" id="resources" aria-label="Educational resources">
    <div className="container">
      <div className="text-center">
        <span className="section-label">Resources</span>
        <h2 className="section-title">Learn to <span className="highlight">Stay Safe</span></h2>
        <p className="section-subtitle mx-auto">Educational content to help you recognize and avoid mobile money fraud.</p>
      </div>
      <div className="resources-grid">
        {resources.map((r, i) => (
          <div className="resource-card fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="icon">{r.icon}</span>
            <h4>{r.title}</h4>
            <p>{r.desc}</p>
            <button className="btn btn-outline btn-sm">Explore</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
