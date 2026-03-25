import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import VendorsHero from '@/components/vendors/VendorsHero';
import VendorFilterBar from '@/components/vendors/VendorFilterBar';
import VendorsGrid from '@/components/vendors/VendorsGrid';
import { VENDORS } from '@/data/vendors';

const CATEGORY_MAP: Record<string, string> = {
  'Fashion': 'Fashion',
  'Jewelry': 'Jewelry',
  'Wellness': 'Wellness',
  'Art': 'Art',
  'Food & Drink': 'Food',
  'Home & Living': 'Home',
  'Books & Courses': 'Books',
  'Music Merch': 'Music',
};

const PAGE_SIZE = 12;
const LOAD_MORE_SIZE = 6;

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const filteredVendors = useMemo(() => {
    let results = [...VENDORS];

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      results = results.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.desc.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      const mapped = CATEGORY_MAP[activeCategory];
      if (mapped) {
        results = results.filter((v) => v.category === mapped);
      }
    }

    switch (sortBy) {
      case 'highest-rated':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'most-sales': {
        const parseSales = (s: string) => {
          const n = parseFloat(s.replace('K', ''));
          return s.includes('K') ? n * 1000 : n;
        };
        results.sort((a, b) => parseSales(b.sales) - parseSales(a.sales));
        break;
      }
      case 'newest':
        results.reverse();
        break;
      case 'featured':
      default:
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return results;
  }, [activeSearch, activeCategory, sortBy]);

  const visibleVendors = filteredVendors.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVendors.length;

  return (
    <>
      <VendorsHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <VendorFilterBar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="directory-layout">
        <div className="directory-meta">
          <span>{filteredVendors.length} vendors</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="highest-rated">Highest Rated</option>
            <option value="most-sales">Most Sales</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <VendorsGrid vendors={visibleVendors} />
        {hasMore && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_SIZE)}
          >
            Load More Vendors
          </button>
        )}
      </div>
      <section className="become-vendor-cta">
        <h2>Ready to Sell on 121212?</h2>
        <p>Join the Global Black Marketplace and reach customers across the diaspora.</p>
        <Link to="/sell" className="btn-primary">Become a Vendor</Link>
      </section>
    </>
  );
}
