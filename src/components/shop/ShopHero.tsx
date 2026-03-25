interface ShopHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export default function ShopHero({ searchQuery, onSearchChange, onSearch }: ShopHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <section className="shop-hero">
      <h1>Shop the <span>Culture</span></h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products, vendors, categories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </section>
  );
}
