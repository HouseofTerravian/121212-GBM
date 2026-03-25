export default function ShopSidebar() {
  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-inputs">
          <input type="number" placeholder="Min" min="0" />
          <input type="number" placeholder="Max" min="0" />
        </div>
      </div>

      <div className="filter-section">
        <h3>Vendor Country</h3>
        <div className="checkbox-group">
          {['USA', 'Nigeria', 'Ghana', 'Jamaica', 'UK', 'South Africa', 'Canada', 'Other'].map((country) => (
            <label key={country}>
              <input type="checkbox" /> {country}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Vendor Status</h3>
        <div className="checkbox-group">
          {['GBM Verified', 'Mogul Seller', 'New Arrivals'].map((status) => (
            <label key={status}>
              <input type="checkbox" /> {status}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="radio-group">
          {[
            { value: '5', label: '5.0' },
            { value: '4', label: '4.0+' },
            { value: '3', label: '3.0+' },
            { value: 'any', label: 'Any' },
          ].map((opt) => (
            <label key={opt.value}>
              <input type="radio" name="rating" value={opt.value} /> {opt.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
