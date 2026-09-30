import React from 'react';
import Hero from '../components/Hero';
import CompatibilitySection from '../components/CompatibilitySection';
import PerformanceSection from '../components/PerformanceSection';
import BuildShowcase from '../components/BuildShowcase';
import CTA from '../components/CTA';

const LandingPage = () => {
  return (
    <>
      <main>
        <Hero />
        <CompatibilitySection />
        <PerformanceSection />
        <BuildShowcase />
        <CTA />
      </main>
    </>
  );
};

export default LandingPage;
