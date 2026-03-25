import { Link } from 'react-router-dom';
import type { StaticProduct } from '@/types';

interface ProductCardProps {
  product: StaticProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card" data-cat={product.category}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-vendor">{product.vendorName}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating">{'★'.repeat(Math.round(product.rating))} {product.rating}</span>
        </div>
        <span className="product-tag">{product.countryFlag} {product.country}</span>
      </div>
    </Link>
  );
}
