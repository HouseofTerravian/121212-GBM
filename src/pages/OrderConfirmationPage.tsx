import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';

interface ConfirmationState {
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
}

export default function OrderConfirmationPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ConfirmationState | null;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div className="order-confirmation"><p>Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-card">
        <div className="confirmation-check">&#10003;</div>
        <h1>Order Confirmed!</h1>
        {state?.orderId && (
          <p className="confirmation-order-id">Order #{state.orderId}</p>
        )}
        <p className="confirmation-message">
          Thank you for supporting Black-owned businesses.
        </p>

        {state?.items && (
          <div className="confirmation-summary">
            <h3>Order Summary</h3>
            {state.items.map((item, idx) => (
              <div key={idx} className="confirmation-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="confirmation-total">
              <span>Total</span>
              <span>${state.subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="confirmation-actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn-secondary">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
