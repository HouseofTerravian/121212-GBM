import { CATEGORIES } from '@/data/categories';

interface CategoryPillsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryPills({ activeCategory, onCategoryChange }: CategoryPillsProps) {
  return (
    <div className="category-pills">
      <div className="pills-inner">
        <button
          className={activeCategory === '' ? 'active' : ''}
          onClick={() => onCategoryChange('')}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            className={activeCategory === cat.slug ? 'active' : ''}
            onClick={() => onCategoryChange(cat.slug)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
