import React from 'react';

const logos = [
  { icon: 'fa-network-wired', name: 'MTN' },
  { icon: 'fa-broadcast-tower', name: 'Telecel' },
  { icon: 'fa-satellite', name: 'AT' },
  { icon: 'fa-university', name: 'Bank of Ghana' },
  { icon: 'fa-shield', name: 'Cyber Security Authority' },
  { icon: 'fa-user-tie', name: 'Ghana Police' },
];

export const TrustSection: React.FC = () => (
  <section className="trust-section" aria-label="Trusted organizations">
    <div className="container">
      <span className="trust-label">Trusted by</span>
      <div className="trust-logos">
        {logos.map((l, i) => (
          <span className="trust-logo" key={i}>
            <i className={`fas ${l.icon}`}></i> {l.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);
