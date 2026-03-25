import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, vendor, isLoading } = useProductDetail(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addToCart } = useCart();

  if (isLoading) {
    return <div className="product-detail"><p>Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="product-detail-empty">
          <h2>Product Not Found</h2>
          <p>This product may have been removed or is no longer available.</p>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const mainImage = product.images[selectedImage] || product.images[0];
  const hasMultipleImages = product.images.length > 1;
  const vendorSlug = vendor?.slug || '';

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      vendorId: product.vendorId,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '',
      vendorName: vendor?.storefrontName || '',
      platformFeePct: vendor?.platformFeePct || 20,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="product-detail">
      <div className="product-detail-back">
        <Link to="/shop">&larr; Back to Shop</Link>
      </div>

      <div className="product-detail-content">
        {/* Image Gallery */}
        <div className="product-detail-gallery">
          <div className="product-detail-main-image">
            {mainImage && (
              <img src={mainImage.url} alt={mainImage.altText || product.name} />
            )}
          </div>
          {hasMultipleImages && (
            <div className="product-detail-thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  className={`product-detail-thumb ${idx === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img.url} alt={img.altText || `${product.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <div className="product-detail-price">
            <span className="product-detail-current-price">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="product-detail-compare-price">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="product-detail-rating">
            <span className="product-detail-stars">
              {'★'.repeat(Math.round(product.avgRating))}
              {'☆'.repeat(5 - Math.round(product.avgRating))}
            </span>
            <span className="product-detail-review-count">
              {product.avgRating.toFixed(1)} ({product.totalReviews} reviews)
            </span>
          </div>

          {/* Vendor Mini-Card */}
          {vendor && (
            <Link to={`/vendor/${vendorSlug}`} className="product-detail-vendor-card">
              {vendor.avatarUrl && (
                <img
                  className="product-detail-vendor-avatar"
                  src={vendor.avatarUrl}
                  alt={vendor.storefrontName}
                />
              )}
              <div className="product-detail-vendor-info">
                <span className="product-detail-vendor-name">{vendor.storefrontName}</span>
                <span className="product-detail-vendor-country">{vendor.country}</span>
              </div>
              <span className={`tier-badge tier-${vendor.tier.toLowerCase()}`}>{vendor.tier}</span>
            </Link>
          )}

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button className="btn-primary product-detail-add-cart" onClick={handleAddToCart}>
            {addedFeedback ? 'Added!' : 'Add to Cart'}
          </button>

          {product.tags.length > 0 && (
            <div className="product-detail-tags">
              {product.tags.map((tag) => (
                <span key={tag} className="product-detail-tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="product-detail-meta-row">
            <span>Type: {product.productType}</span>
            <span>SKU: {product.sku || 'N/A'}</span>
            <span>{product.totalSold} sold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
