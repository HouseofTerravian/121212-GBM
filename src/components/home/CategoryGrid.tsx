import { CATEGORIES } from '@/data/categories';

export default function CategoryGrid() {
  return (
    <section className="categories">
      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.slug} className="category-item">
            <div className="category-icon">{cat.emoji}</div>
            <div className="category-label">{cat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
