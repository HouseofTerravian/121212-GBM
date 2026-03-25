const TRUST_ITEMS = [
  'Zero setup fees on all plans',
  'Keep up to 80% of earnings',
  'Sell to 75+ countries',
  'Built for the diaspora',
  'Launch in minutes',
];

export default function TrustStrip() {
  return (
    <section className="sell-trust">
      <div className="sell-trust-grid">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="sell-trust-item">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
