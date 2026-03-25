import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopHero from '@/components/shop/ShopHero';
import CategoryPills from '@/components/shop/CategoryPills';
import ShopSidebar from '@/components/shop/ShopSidebar';
import { useShopProducts } from '@/hooks/useShopProducts';
import { getMockVendorById } from '@/lib/mock/mockVendors';

const PER_PAGE = 12;

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };

  const { products, totalCount, hasMore } = useShopProducts(
    { search: activeSearch, category: activeCategory || 'all', sortBy },
    page,
    PER_PAGE
  );

  return (
    <>
      <ShopHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <CategoryPills
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="shop-layout">
        <ShopSidebar />
        <div className="products-area">
          <div className="products-toolbar">
            <span>{totalCount} products</span>
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>
          <div className="products-grid">
            {products.map((product) => {
              const vendor = getMockVendorById(product.vendorId);
              const vendorName = vendor?.storefrontName || 'Vendor';
              return (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="product-card"
                  data-cat={product.categorySlug}
                >
                  <div className="product-image">
                    <img
                      src={product.images[0]?.url || ''}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info">
                    <span className="product-vendor">{vendorName}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-meta">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <span className="product-rating">
                        {'★'.repeat(Math.round(product.avgRating))} {product.avgRating}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {hasMore && (
            <button
              className="load-more-btn"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load More Products
            </button>
          )}
        </div>
      </div>
    </>
  );
}
