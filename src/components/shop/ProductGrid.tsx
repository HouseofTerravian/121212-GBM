import type { StaticProduct } from '@/types';
import ProductCard from '@/components/shop/ProductCard';

interface ProductGridProps {
  products: StaticProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
