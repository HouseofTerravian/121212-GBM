import { Link } from 'react-router-dom';
import { useBuyerOrders } from '@/hooks/useBuyerOrders';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AccountOrdersPage() {
  const { orders, isLoading } = useBuyerOrders();

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <h1>My Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="dashboard-page">
        <h1>My Orders</h1>
        <div className="account-empty-state">
          <p>No orders yet. Start shopping!</p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1>My Orders</h1>
      <div className="account-orders-list">
        {orders.map((order) => {
          const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
          return (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="account-order-row"
            >
              <div className="account-order-row-left">
                <span className="account-order-id">{order.id}</span>
                <span className="account-order-date">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="account-order-row-right">
                <span className="account-order-items">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </span>
                <span className="account-order-total">
                  ${order.total.toFixed(2)}
                </span>
                <span className={`order-status-badge status-${order.status}`}>
                  {statusLabel(order.status)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
