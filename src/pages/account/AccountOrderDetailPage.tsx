import { useParams, Link } from 'react-router-dom';
import { useBuyerOrders } from '@/hooks/useBuyerOrders';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AccountOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { orders, isLoading } = useBuyerOrders();

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <p>Loading...</p>
      </div>
    );
  }

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="dashboard-page">
        <h1>Order Not Found</h1>
        <p>We could not find an order with ID "{id}".</p>
        <Link to="/account/orders" className="btn btn-outline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Link to="/account/orders" className="account-back-to-orders">
        &larr; Back to Orders
      </Link>

      <div className="account-order-header">
        <div>
          <h1>Order {order.id}</h1>
          <p className="account-order-header-date">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <span className={`order-status-badge status-${order.status}`}>
          {statusLabel(order.status)}
        </span>
      </div>

      {order.trackingNumber && (
        <div className="account-tracking-info">
          <strong>Tracking:</strong>{' '}
          {order.trackingUrl ? (
            <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
              {order.trackingNumber}
            </a>
          ) : (
            <span>{order.trackingNumber}</span>
          )}
        </div>
      )}

      <div className="account-order-items">
        <table className="account-order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="account-order-totals">
        <div className="account-order-totals-row">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="account-order-totals-row account-order-totals-final">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
