import { Link } from 'react-router-dom';

export default function SellerCTA() {
  return (
    <section className="seller-cta">
      <div className="seller-image">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop"
          alt="Seller on the marketplace"
        />
      </div>
      <div className="seller-content">
        <h2>Create your storefront in minutes.</h2>
        <h3>Keep 80% of your earnings.</h3>
        <p>Your products deserve a global stage.</p>
        <ul className="seller-features">
          <li>Zero setup fees</li>
          <li>Built-in payment processing</li>
          <li>Global shipping support</li>
          <li>Marketing tools included</li>
          <li>24/7 seller support</li>
        </ul>
        <Link to="/sell" className="btn-secondary">
          Join 5,000+ Sellers
        </Link>
      </div>
    </section>
  );
}
