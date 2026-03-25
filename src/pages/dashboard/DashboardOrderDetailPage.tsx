import { useParams, useNavigate } from 'react-router-dom';
import { useVendorContext } from '@/contexts/VendorContext';
import OrderDetail from '@/components/dashboard/OrderDetail';

export default function DashboardOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useVendorContext();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="dashboard-page">
        <h1>Order Not Found</h1>
        <p>The order you are looking for does not exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/orders')}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <button className="btn btn-outline btn-back" onClick={() => navigate('/dashboard/orders')}>
        &larr; Back to Orders
      </button>
      <OrderDetail order={order} onUpdateStatus={updateOrderStatus} />
    </div>
  );
}
