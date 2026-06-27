import React, { useState, useEffect, useCallback } from 'react';

const testimonials = [
  { name: 'Ama K.', location: 'Accra, Ghana', avatar: 'A', text: 'FraudShield AI saved me from a SIM swap scam. The chatbot alerted me immediately and I was able to block the transaction.', stars: 5 },
  { name: 'Kwame M.', location: 'Kumasi, Ghana', avatar: 'K', text: 'I received a suspicious MTN message and used the screenshot analysis. It flagged it as fraud within seconds. Incredible tool!', stars: 5 },
  { name: 'Esi A.', location: 'Tema, Ghana', avatar: 'E', text: 'The phone number checker helped me avoid sending money to a fake agent. I recommend this platform to everyone.', stars: 4 },
  { name: 'Yaw B.', location: 'Takoradi, Ghana', avatar: 'Y', text: 'I\'ve learned so much from the educational resources. Now I can spot scams from a mile away. Thank you FraudShield!', stars: 5 },
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const getVisible = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const maxIndex = Math.max(0, testimonials.length - getVisible());

  const next = useCallback(() => setIndex(prev => (prev + 1 > maxIndex ? 0 : prev + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex(prev => (prev - 1 < 0 ? maxIndex : prev - 1)), [maxIndex]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const onResize = () => {
      const v = getVisible();
      setIndex(prev => Math.min(prev, Math.max(0, testimonials.length - v)));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section className="testimonials-section section-padding" id="testimonials" aria-label="Testimonials">
      <div className="container">
        <div className="text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our <span className="highlight">Users Say</span></h2>
          <p className="section-subtitle mx-auto">Real stories from people who have been protected by FraudShield AI.</p>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-track" style={{ transform: `translateX(-${index * (100 / getVisible())}%)` }}>
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="profile">
                  <div className="avatar">{t.avatar}</div>
                  <div className="info">
                    <h5>{t.name}</h5>
                    <span>{t.location}</span>
                  </div>
                </div>
                <div className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                <blockquote>"{t.text}"</blockquote>
              </div>
            ))}
          </div>
        </div>
        <div className="slider-controls">
          <button onClick={prev} aria-label="Previous testimonial"><i className="fas fa-chevron-left"></i></button>
          <button onClick={next} aria-label="Next testimonial"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>
  );
};
