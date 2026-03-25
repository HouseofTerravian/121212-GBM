import { useVendorContext } from '@/contexts/VendorContext';
import VendorOverview from '@/components/dashboard/VendorOverview';
import OrderList from '@/components/dashboard/OrderList';

export default function DashboardOverviewPage() {
  const { vendor, products, orders } = useVendorContext();

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.vendorPayout, 0),
    0,
  );

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    avgRating: vendor?.avgRating ?? 0,
  };

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <VendorOverview stats={stats} />
      <section className="dashboard-section">
        <h2>Recent Orders</h2>
        <OrderList orders={recentOrders} />
      </section>
    </div>
  );
}
