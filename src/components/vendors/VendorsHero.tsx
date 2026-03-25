interface VendorsHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

export default function VendorsHero({ searchQuery, onSearchChange, onSearch }: VendorsHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <section className="vendors-hero">
      <h1>The <span>Vendor</span> Directory</h1>
      <p>Explore verified Black-owned businesses from across the diaspora. Every store is a story.</p>
      <div className="vendor-search-wrap">
        <input
          type="text"
          placeholder="Search vendors by name, location, or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </section>
  );
}
