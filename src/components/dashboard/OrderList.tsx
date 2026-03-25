import { Link } from 'react-router-dom';
import type { Order, OrderStatus } from '@/types';

interface OrderListProps {
  orders: Order[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function truncateId(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}...` : id;
}

const STATUS_CLASS: Record<OrderStatus, string> = {
  paid: 'order-status-paid',
  processing: 'order-status-processing',
  shipped: 'order-status-shipped',
  delivered: 'order-status-delivered',
  cancelled: 'order-status-cancelled',
  refunded: 'order-status-refunded',
};

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="order-list">
        <h2>Orders</h2>
        <p className="order-list-empty">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h2>Orders</h2>
      <div className="order-list-items">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/dashboard/orders/${order.id}`}
            className="order-list-item"
          >
            <span className="order-list-id">{truncateId(order.id)}</span>
            <span className="order-list-date">{formatDate(order.createdAt)}</span>
            <span className="order-list-customer">{order.buyerName ?? 'Unknown'}</span>
            <span className="order-list-count">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </span>
            <span className="order-list-total">{formatCurrency(order.total)}</span>
            <span className={`order-status-badge ${STATUS_CLASS[order.status]}`}>
              {order.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
