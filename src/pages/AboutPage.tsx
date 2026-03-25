import { Link } from 'react-router-dom';
import StatCounter from '@/components/ui/StatCounter';

const WHY_ITEMS = [
  {
    icon: '\u2713',
    title: 'Verified Black Vendor Program',
    description:
      'Our vendor verification is based on self-identification — no documentation required. We trust our community.',
  },
  {
    icon: '%',
    title: '80% Vendor Revenue Share',
    description:
      'Even on our free tier, vendors keep 80% of every sale. Mogul-tier vendors keep up to 96%.',
  },
  {
    icon: '\u2660',
    title: 'Truly Global Infrastructure',
    description:
      'Sell and shop across 75+ countries. The diaspora is worldwide, and so is GBM.',
  },
  {
    icon: '\u2605',
    title: 'Built-In Community Marketing',
    description:
      'Your products are promoted to a community that is actively looking to support Black-owned businesses.',
  },
  {
    icon: '$',
    title: 'Zero Setup Fees',
    description:
      'Every plan starts with zero upfront costs. You only pay when you sell.',
  },
  {
    icon: '\u2764',
    title: 'Seller-First Policies',
    description:
      'Transparent fees, fair dispute resolution, and a platform that treats sellers as partners — not products.',
  },
];

const PRINCIPLES = [
  {
    number: 1,
    title: 'Identity is Voluntary',
    description:
      'We never require proof of race or ethnicity. Self-identification is enough.',
  },
  {
    number: 2,
    title: 'Economics Over Optics',
    description:
      'We measure success by revenue generated for vendors, not vanity metrics.',
  },
  {
    number: 3,
    title: 'Diaspora Includes Everyone',
    description:
      'African, Caribbean, Afro-Latin, Black American, Afro-European — the diaspora is global and so are we.',
  },
  {
    number: 4,
    title: 'Sellers Are Partners',
    description:
      'Vendors are not tenants on our platform. They are co-builders of this economy.',
  },
  {
    number: 5,
    title: 'Buyers Are Community',
    description:
      'Every purchase is an investment in the community. Buyers are not just customers — they are participants.',
  },
  {
    number: 6,
    title: 'Long Game Always',
    description:
      'We are building generational infrastructure, not chasing quarterly growth targets.',
  },
];

const STATS = [
  { target: 5_000, label: 'Active Vendors' },
  { target: 150_000, label: 'Products' },
  { target: 75, label: 'Countries' },
  { target: 2_000_000, label: 'Community' },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <h1>Built by the diaspora. For the diaspora.</h1>
        <p>
          121212 GBM exists for one purpose: to create generational wealth
          through commerce.
        </p>
      </section>

      <section className="about-story">
        <h2>Why We Built This</h2>
        <p>
          Black entrepreneurs have always been innovators — building brands,
          creating culture, and driving global trends. But the platforms they
          rely on were never built with them in mind. High fees, opaque
          algorithms, and zero cultural understanding create barriers that
          cost the community billions every year.
        </p>
        <p>
          121212 GBM was created to change that. We built a marketplace where
          Black-owned businesses are not a filter or a hashtag — they are the
          entire foundation. Every feature, every policy, and every decision
          is made with one question in mind: does this help Black
          entrepreneurs build wealth?
        </p>
      </section>

      <section className="about-mvv">
        <div className="mvv-grid">
          <div className="mvv-card">
            <h3>Mission</h3>
            <p>
              Build a global platform where Black entrepreneurs can sell,
              scale, and thrive — without gatekeepers.
            </p>
          </div>
          <div className="mvv-card">
            <h3>Vision</h3>
            <p>
              A world where the Black dollar circulates within Black
              communities before it leaves.
            </p>
          </div>
          <div className="mvv-card">
            <h3>Values</h3>
            <p>
              Community over corporation. Transparency over profit.
              Accountability over convenience.
            </p>
          </div>
        </div>
      </section>

      <section className="about-why">
        <h2>Why GBM Is Different</h2>
        <div className="why-grid">
          {WHY_ITEMS.map((item) => (
            <div key={item.title} className="why-item">
              <span className="why-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-numbers">
        <h2>The Movement in Numbers</h2>
        <div className="about-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <StatCounter target={s.target} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      <section className="about-principles">
        <h2>Guiding Principles</h2>
        <div className="principles-grid">
          {PRINCIPLES.map((p) => (
            <div key={p.number} className="principle-card">
              <span className="principle-number">{p.number}</span>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Join the Movement?</h2>
        <div className="about-cta-actions">
          <Link to="/sell" className="btn-primary">
            Start Selling
          </Link>
          <Link to="/shop" className="btn-secondary">
            Shop the Culture
          </Link>
        </div>
      </section>
    </>
  );
}
