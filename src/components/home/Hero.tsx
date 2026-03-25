import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <img
        src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=900&fit=crop"
        alt=""
        className="hero-bg"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>
          The Global Black
          <br />
          Marketplace
        </h1>
        <p>
          Discover handmade goods, art, fashion, and
          <br />
          wellness crafted across the diaspora.
        </p>
        <div className="hero-actions">
          <Link to="/sell" className="btn-primary">
            Start Selling Now
          </Link>
          <Link to="/shop" className="btn-secondary">
            Shop the Culture
          </Link>
        </div>
      </div>
    </section>
  );
}
