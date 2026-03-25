const STEPS = [
  {
    number: 1,
    title: 'Choose Your Plan',
    description:
      "Pick the tier that fits where you are — start free, upgrade when you're ready.",
  },
  {
    number: 2,
    title: 'Create Your Account',
    description:
      'Set up your vendor profile, storefront name, and business details in minutes.',
  },
  {
    number: 3,
    title: 'List Your Products',
    description:
      'Upload photos, set prices, and write descriptions. Your first listing goes live instantly.',
  },
  {
    number: 4,
    title: 'Start Selling',
    description:
      'Get discovered by customers across the diaspora. Payments land directly in your account.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {STEPS.map((step) => (
          <div key={step.number} className="step">
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
