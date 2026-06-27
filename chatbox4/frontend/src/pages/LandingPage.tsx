import React, { useState, useEffect } from 'react';
import {
  Navbar, Hero, TrustSection, AboutSection, FeaturesSection, HowItWorks,
  FraudTypes, AlertsSection, AnalyticsSection, CommunityImpact, ChatbotCTA,
  ScreenshotAnalysis, PhoneChecker, ResourcesSection, Testimonials, FAQ,
  ContactFooter, ScrollProgress, FloatingButtons, ToastContainer,
  CookieConsent, EmergencyBanner, FraudTicker, showGlobalToast,
} from '../components/landing';
import { ChatPanel } from '../components/ChatPanel';
import { useScrollAnimation, useCounterAnimation } from '../hooks';
import '../styles/landing.css';

export const LandingPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useScrollAnimation();
  useCounterAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      showGlobalToast('info', ' Welcome to FraudShield AI — Stay safe!');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-page">
      <Navbar onNavigateChat={() => setIsChatOpen(true)} />
      <EmergencyBanner />
      <FraudTicker />
      <ScrollProgress />
      <main id="main-content">
        <Hero onNavigateChat={() => setIsChatOpen(true)} />
        <TrustSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorks />
        <FraudTypes />
        <AlertsSection />
        <AnalyticsSection />
        <CommunityImpact />
        <ChatbotCTA onNavigateChat={() => setIsChatOpen(true)} />
        <ScreenshotAnalysis />
        <PhoneChecker />
        <ResourcesSection />
        <Testimonials />
        <FAQ />
      </main>
      <ContactFooter />
      <FloatingButtons onNavigateChat={() => setIsChatOpen(true)} />
      <ToastContainer />
      <CookieConsent />
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
