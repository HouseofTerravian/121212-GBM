const VENDOR_CATEGORIES = [
  'All',
  'Fashion',
  'Jewelry',
  'Wellness',
  'Art',
  'Food & Drink',
  'Home & Living',
  'Books & Courses',
  'Music Merch',
];

interface VendorFilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function VendorFilterBar({ activeCategory, onCategoryChange }: VendorFilterBarProps) {
  return (
    <div className="vendor-filters-bar">
      <span className="filter-label">Filter:</span>
      <div className="filter-pills">
        {VENDOR_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
