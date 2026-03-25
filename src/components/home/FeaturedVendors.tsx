import { VENDORS } from '@/data/vendors';

const featured = VENDORS.filter((v) => v.featured);

export default function FeaturedVendors() {
  return (
    <section className="featured-vendors">
      <h2 className="section-heading">Featured Vendors</h2>
      <div className="vendor-grid">
        {featured.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <div className="vendor-avatar">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                width={180}
                height={180}
              />
              {vendor.verified && (
                <span className="verified-badge" title="Verified">
                  ✓
                </span>
              )}
            </div>
            <h3 className="vendor-name">{vendor.name}</h3>
            <p className="vendor-location">{vendor.location}</p>
            <span className="vendor-verified-label">Verified Black Vendor</span>
            <div className="vendor-rating">
              {'★'.repeat(Math.floor(vendor.rating))}
              {vendor.rating % 1 !== 0 && '½'}
              <span>{vendor.rating}</span>
            </div>
            <div className="vendor-stats">
              <div>
                <strong>{vendor.products}</strong>
                <span>Products</span>
              </div>
              <div>
                <strong>{vendor.rating}</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>{vendor.sales}</strong>
                <span>Sales</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
