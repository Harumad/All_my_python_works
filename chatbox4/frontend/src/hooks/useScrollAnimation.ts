import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const els = document.querySelectorAll('.landing-page .fade-up, .landing-page .fade-left, .landing-page .fade-right, .landing-page .zoom-in, .landing-page .timeline-item, .landing-page .stat-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
