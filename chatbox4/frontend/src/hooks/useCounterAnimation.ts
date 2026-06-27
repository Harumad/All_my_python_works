import { useEffect, useRef } from 'react';

export function useCounterAnimation() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const counters = document.querySelectorAll('.landing-page .counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const card = el.closest('.stat-card') as HTMLElement;
          if (!card) return;
          const target = parseInt(card.dataset.count || '0', 10);
          if (isNaN(target)) return;

          let current = 0;
          const increment = Math.ceil(target / 80);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString();
          }, 20);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);
}
