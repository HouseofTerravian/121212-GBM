import { useState } from 'react';
import type { Order, OrderStatus } from '@/types';

interface OrderDetailProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_CLASS: Record<OrderStatus, string> = {
  paid: 'order-status-paid',
  processing: 'order-status-processing',
  shipped: 'order-status-shipped',
  delivered: 'order-status-delivered',
  cancelled: 'order-status-cancelled',
  refunded: 'order-status-refunded',
};

export default function OrderDetail({ order, onUpdateStatus }: OrderDetailProps) {
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber ?? '');
  const [trackingUrl, setTrackingUrl] = useState(order.trackingUrl ?? '');

  const vendorPayout = order.items.reduce((sum, item) => sum + item.vendorPayout, 0);

  return (
    <div className="order-detail">
      <div className="order-detail-header">
        <div>
          <h2>Order {order.id.slice(0, 8)}...</h2>
          <p className="order-detail-date">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`order-status-badge ${STATUS_CLASS[order.status]}`}>
          {order.status}
        </span>
      </div>

      {/* Customer info */}
      <div className="order-detail-section">
        <h3>Customer</h3>
        <p>{order.buyerName ?? 'Unknown'}</p>
        {order.shippingAddress && (
          <div className="order-detail-address">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="order-detail-section">
        <h3>Items</h3>
        <div className="order-detail-items">
          {order.items.map((item) => (
            <div key={item.id} className="order-detail-item-row">
              <div className="order-detail-item-image">
                {item.product?.images && item.product.images.length > 0 ? (
                  <img src={item.product.images[0].url} alt={item.product.name} />
                ) : (
                  <div className="product-list-image-placeholder" />
                )}
              </div>
              <span className="order-detail-item-name">
                {item.product?.name ?? `Product ${item.productId.slice(0, 6)}`}
              </span>
              <span className="order-detail-item-qty">x{item.quantity}</span>
              <span className="order-detail-item-price">{formatCurrency(item.unitPrice)}</span>
              <span className="order-detail-item-total">
                {formatCurrency(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="order-detail-totals">
        <div className="order-detail-total-row">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="order-detail-total-row">
          <span>Platform Fee</span>
          <span>-{formatCurrency(order.platformFee)}</span>
        </div>
        <div className="order-detail-total-row">
          <span>Order Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
        <div className="order-detail-total-row order-detail-payout">
          <span>Your Payout</span>
          <span>{formatCurrency(vendorPayout)}</span>
        </div>
      </div>

      {/* Tracking info */}
      {(order.trackingNumber || order.trackingUrl) && (
        <div className="order-detail-section">
          <h3>Tracking</h3>
          {order.trackingNumber && <p>Tracking #: {order.trackingNumber}</p>}
          {order.trackingUrl && (
            <p>
              <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                View Tracking
              </a>
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="order-detail-actions">
        {order.status === 'paid' && (
          <button
            className="btn btn-primary"
            onClick={() => onUpdateStatus(order.id, 'processing')}
          >
            Mark as Processing
          </button>
        )}

        {order.status === 'processing' && (
          <>
            <div className="order-detail-tracking-inputs">
              <div className="product-form-group">
                <label htmlFor="od-tracking-num">Tracking Number</label>
                <input
                  id="od-tracking-num"
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. 1Z999AA10123456784"
                />
              </div>
              <div className="product-form-group">
                <label htmlFor="od-tracking-url">Tracking URL</label>
                <input
                  id="od-tracking-url"
                  type="url"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onUpdateStatus(order.id, 'shipped')}
            >
              Mark as Shipped
            </button>
          </>
        )}

        {order.status === 'shipped' && (
          <button
            className="btn btn-primary"
            onClick={() => onUpdateStatus(order.id, 'delivered')}
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  );
}
