import { useVendorContext } from '@/contexts/VendorContext';
import OrderList from '@/components/dashboard/OrderList';

export default function DashboardOrdersPage() {
  const { orders } = useVendorContext();

  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="dashboard-page">
      <h1>Orders</h1>
      <OrderList orders={sorted} />
    </div>
  );
}
