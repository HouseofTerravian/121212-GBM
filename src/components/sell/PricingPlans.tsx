interface PricingPlansProps {
  onSelectPlan: (planName: string) => void;
}

const PLANS = [
  {
    name: 'Griot (Free)',
    className: 'plan-free',
    price: '$0',
    period: 'Free forever',
    features: [
      'Up to 10 product listings',
      'Basic storefront page',
      '20% platform fee per sale',
      'GBM Verified badge eligible',
      'Community forum access',
      'Email support',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Merchant ($49/mo)',
    className: 'plan-mid',
    price: '$49',
    period: 'per month',
    features: [
      'Up to 100 product listings',
      'Custom storefront + banner',
      '10% platform fee per sale',
      'Featured in vendor directory',
      'Marketing tools & analytics',
      'Priority email support',
      'Promotional placement eligibility',
    ],
    cta: 'Start Selling',
  },
  {
    name: 'Mogul ($200/mo)',
    className: 'plan-top',
    price: '$200',
    period: 'per month',
    badge: 'Most Powerful',
    features: [
      'Unlimited product listings',
      'Premium storefront + custom domain',
      '4% platform fee per sale',
      'Homepage feature rotations',
      'Advanced analytics dashboard',
      'Dedicated account manager',
      'Early access to new features',
      'Co-branded promotional campaigns',
    ],
    cta: 'Go Mogul',
  },
];

export default function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  const handleSelect = (planName: string) => {
    onSelectPlan(planName);
    const el = document.getElementById('signup');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pricing">
      <h2>Choose Your Plan</h2>
      <div className="plans-grid">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`plan-card ${plan.className}`}>
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <div className="plan-price">
              <span className="plan-amount">{plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className="btn-primary"
              onClick={() => handleSelect(plan.name)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
