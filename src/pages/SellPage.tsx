import { useState } from 'react';
import SellHero from '@/components/sell/SellHero';
import TrustStrip from '@/components/sell/TrustStrip';
import HowItWorks from '@/components/sell/HowItWorks';
import PricingPlans from '@/components/sell/PricingPlans';
import SignupForm from '@/components/sell/SignupForm';
import FAQ from '@/components/sell/FAQ';

export default function SellPage() {
  const [selectedPlan, setSelectedPlan] = useState('Griot (Free)');

  return (
    <>
      <SellHero />
      <TrustStrip />
      <HowItWorks />
      <PricingPlans onSelectPlan={setSelectedPlan} />
      <SignupForm selectedPlan={selectedPlan} />
      <FAQ />
    </>
  );
}
