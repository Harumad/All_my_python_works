import React, { useState, useMemo } from 'react';

const faqData = [
  { q: 'What is Mobile Money fraud?', a: 'Mobile Money fraud refers to any scheme designed to steal money from mobile money accounts. Scammers use fake messages, SIM swaps, phishing, and social engineering to trick users into sending money or sharing sensitive information.' },
  { q: 'How does FraudShield AI detect scams?', a: 'Our AI analyzes message content, sender behavior, and known fraud patterns. It uses natural language processing and machine learning to identify red flags like urgent requests, fake numbers, and phishing links.' },
  { q: 'Is FraudShield AI free to use?', a: 'Yes! Our basic fraud detection and education features are completely free for all users in Ghana.' },
  { q: 'How do I report a fraud incident?', a: 'You can report fraud using our secure reporting form in the Contact section, or call our emergency hotline at +233 55 123 4567.' },
  { q: 'What should I do if I think I\'ve been scammed?', a: 'Immediately contact your mobile money provider, report to the Ghana Police, and call our emergency hotline. Change your PIN and review your transaction history.' },
  { q: 'What are the most common scams in Ghana?', a: 'Common scams include fake MTN promotions, SIM swap fraud, fake agents, investment scams, WhatsApp scams, and romance scams.' },
  { q: 'How can I protect my mobile money?', a: 'Never share your PIN or OTP, verify all requests, use strong passwords, avoid clicking on suspicious links, and always double-check transaction details.' },
  { q: 'What is SIM swap fraud?', a: 'SIM swap fraud occurs when a scammer convinces your mobile network provider to transfer your phone number to a SIM card they control, giving them access to your mobile money accounts.' },
  { q: 'Can I verify a phone number?', a: 'Yes! Use our Phone Number Checker tool to see if a number has been reported for fraud.' },
  { q: 'How do I spot a phishing message?', a: 'Phishing messages often have urgent language, ask for personal information, contain spelling errors, or come from suspicious numbers. Always verify before acting.' },
  { q: 'What should I do if I receive a suspicious message?', a: 'Do not click any links or reply. Take a screenshot and analyze it using our AI chatbot or upload it to our screenshot analysis tool.' },
  { q: 'Is my data safe with FraudShield AI?', a: 'Yes. We take data privacy seriously. Your information is encrypted and never shared with third parties without your consent.' },
  { q: 'How accurate is the fraud detection?', a: 'Our AI achieves over 96% accuracy in detecting known fraud patterns, and we continuously improve our models based on new scam data.' },
  { q: 'Can I use FraudShield AI on my phone?', a: 'Absolutely! Our website is fully responsive and works seamlessly on all devices, including smartphones and tablets.' },
  { q: 'How can I stay updated on new scams?', a: 'Subscribe to our newsletter, follow our social media channels, and check the Live Fraud Alerts section regularly.' },
];

export const FAQ: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqData;
    const q = search.toLowerCase();
    return faqData.filter(d => d.q.toLowerCase().includes(q) || d.a.toLowerCase().includes(q));
  }, [search]);

  return (
    <section className="faq-section section-padding" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <div className="text-center">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked <span className="highlight">Questions</span></h2>
          <p className="section-subtitle mx-auto">Find answers to the most common questions about fraud prevention and our platform.</p>
        </div>

        <div className="faq-search">
          <i className="fas fa-search"></i>
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }} placeholder="Search FAQ..." aria-label="Search FAQ" />
        </div>

        <div className="faq-accordion">
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '32px 0' }}>No questions found. Try a different search.</p>
          ) : (
            filtered.map((item, i) => (
              <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={i}>
                <div className="question" role="button" tabIndex={0} aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenIndex(openIndex === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="icon"><i className="fas fa-chevron-down"></i></span>
                </div>
                <div className="answer">{item.a}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
