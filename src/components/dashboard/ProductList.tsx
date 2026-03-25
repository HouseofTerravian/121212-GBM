import { Link } from 'react-router-dom';
import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  canAddProduct: boolean;
  listingLimit: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function ProductList({
  products,
  onDelete,
  canAddProduct,
  listingLimit,
}: ProductListProps) {
  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Your Products</h2>
        {canAddProduct ? (
          <Link to="/dashboard/products/new" className="btn btn-primary">
            Add Product
          </Link>
        ) : (
          <div className="listing-limit-cta">
            <span>
              Listing limit reached ({products.length}/{listingLimit})
            </span>
            <Link to="/dashboard/settings" className="btn btn-outline">
              Upgrade Plan
            </Link>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="product-list-empty">
          <p>You have not added any products yet.</p>
          {canAddProduct && (
            <Link to="/dashboard/products/new" className="btn btn-primary">
              Add Your First Product
            </Link>
          )}
        </div>
      ) : (
        <div className="product-list-items">
          {products.map((product) => (
            <div key={product.id} className="product-list-item">
              <div className="product-list-image">
                {product.images.length > 0 ? (
                  <img src={product.images[0].url} alt={product.images[0].altText ?? product.name} />
                ) : (
                  <div className="product-list-image-placeholder" />
                )}
              </div>
              <div className="product-list-info">
                <span className="product-list-name">{product.name}</span>
                <span className="product-list-price">{formatCurrency(product.price)}</span>
              </div>
              <span
                className={`product-status-badge ${product.isActive ? 'active' : 'inactive'}`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="product-list-stock">
                {product.stockQuantity != null ? product.stockQuantity : '--'}
              </span>
              <div className="product-list-actions">
                <Link
                  to={`/dashboard/products/${product.id}/edit`}
                  className="btn btn-sm btn-outline"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
