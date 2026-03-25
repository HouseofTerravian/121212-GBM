interface OverviewStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
}

interface VendorOverviewProps {
  stats: OverviewStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function VendorOverview({ stats }: VendorOverviewProps) {
  return (
    <div className="overview-stats">
      <div className="overview-card">
        <span className="overview-card-value">{stats.totalProducts}</span>
        <span className="overview-card-label">Total Products</span>
      </div>
      <div className="overview-card">
        <span className="overview-card-value">{stats.totalOrders}</span>
        <span className="overview-card-label">Total Orders</span>
      </div>
      <div className="overview-card">
        <span className="overview-card-value">{formatCurrency(stats.totalRevenue)}</span>
        <span className="overview-card-label">Total Revenue</span>
      </div>
      <div className="overview-card">
        <span className="overview-card-value">
          {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '--'}
        </span>
        <span className="overview-card-label">Average Rating</span>
      </div>
    </div>
  );
}
