const FAQS = [
  {
    question: 'Do I need to be verified to sell?',
    answer:
      'No documentation is required to become a vendor. 121212 GBM operates on a self-identification model. You check a box confirming your connection to the Black community, and you are welcome to sell.',
  },
  {
    question: 'When do I receive payment?',
    answer:
      'Payments are processed after order confirmation and fulfillment. Depending on your plan and payment provider, funds typically arrive within 3-7 business days.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, you can change your plan at any time from your vendor dashboard. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.',
  },
  {
    question: "What does 'platform fee' mean?",
    answer:
      'GBM takes a percentage of each sale to cover payment processing, infrastructure, and community development. The fee depends on your plan: 20% for Griot, 10% for Merchant, and 4% for Mogul.',
  },
  {
    question: 'Can I sell digital products?',
    answer:
      'Yes. GBM supports physical goods, digital products, and services. Whether you sell handmade jewelry, e-books, or consulting, there is a place for you on the platform.',
  },
  {
    question: 'What is the GBM Verified badge?',
    answer:
      'The GBM Verified badge signals that a storefront has been reviewed for quality and community alignment. It builds trust with buyers and increases visibility across the marketplace.',
  },
];

export default function FAQ() {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        {FAQS.map((faq) => (
          <div key={faq.question} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
