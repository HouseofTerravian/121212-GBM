import { useParams, Link } from 'react-router-dom';
import { useVendorPublic } from '@/hooks/useVendorPublic';
import type { Product } from '@/types';

function productToCard(p: Product) {
  return (
    <Link to={`/product/${p.id}`} key={p.id} className="product-card" data-cat={p.categorySlug}>
      <div className="product-image">
        <img src={p.images[0]?.url || ''} alt={p.name} loading="lazy" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{p.name}</h3>
        <div className="product-meta">
          <span className="product-price">${p.price.toFixed(2)}</span>
          <span className="product-rating">
            {'★'.repeat(Math.round(p.avgRating))} {p.avgRating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function VendorStorefrontPage() {
  const { slug } = useParams<{ slug: string }>();
  const { vendor, products, isLoading } = useVendorPublic(slug || '');

  if (isLoading) {
    return <div className="storefront-hero"><p>Loading...</p></div>;
  }

  if (!vendor) {
    return (
      <div className="storefront-hero">
        <div className="product-detail-empty">
          <h2>Vendor Not Found</h2>
          <p>This storefront may not exist or has been removed.</p>
          <Link to="/vendors" className="btn-primary">Browse Vendors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront-page">
      {/* Hero / Banner */}
      <div className="storefront-hero">
        <div className="storefront-header">
          <div className="storefront-avatar">
            {vendor.avatarUrl ? (
              <img src={vendor.avatarUrl} alt={vendor.storefrontName} />
            ) : (
              <div className="storefront-avatar-placeholder">
                {vendor.storefrontName.charAt(0)}
              </div>
            )}
            {vendor.isVerified && <span className="vdir-badge-check" />}
          </div>
          <div className="storefront-info">
            <h1>{vendor.storefrontName}</h1>
            <p className="storefront-country">{vendor.country}</p>
            {vendor.bio && <p className="storefront-bio">{vendor.bio}</p>}
            <div className="storefront-badges">
              <span className={`tier-badge tier-${vendor.tier.toLowerCase()}`}>{vendor.tier}</span>
              {vendor.isVerified && <span className="storefront-verified-badge">Verified</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="storefront-stats">
        <div className="storefront-stat">
          <span className="storefront-stat-value">{products.length}</span>
          <span className="storefront-stat-label">Products</span>
        </div>
        <div className="storefront-stat">
          <span className="storefront-stat-value">
            {'★'} {vendor.avgRating.toFixed(1)}
          </span>
          <span className="storefront-stat-label">Rating</span>
        </div>
        <div className="storefront-stat">
          <span className="storefront-stat-value">{vendor.totalSales.toLocaleString()}</span>
          <span className="storefront-stat-label">Total Sales</span>
        </div>
      </div>

      {/* Products Grid */}
      <section className="storefront-products-section">
        <h2>Products</h2>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((p) => productToCard(p))}
          </div>
        ) : (
          <div className="storefront-empty">
            <p>This vendor has no products listed yet.</p>
          </div>
        )}
      </section>

      <div className="storefront-back">
        <Link to="/vendors">&larr; Back to Vendor Directory</Link>
      </div>
    </div>
  );
}
