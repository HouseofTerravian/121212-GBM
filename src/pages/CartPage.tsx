import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/lib/auth/AuthContext';
import { createCheckoutSession } from '@/lib/stripe';

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    const result = await createCheckoutSession(items, user.id);
    navigate('/order-confirmation', { state: { orderId: result.orderId, items, subtotal } });
  };

  return (
    <div className="cart-page">
      <section className="page-hero" style={{ marginTop: 60 }}>
        <h1>Your Cart</h1>
        <p>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
      </section>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.productId} className="cart-item">
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-vendor">{item.vendorName}</p>
                  <p className="cart-item-unit-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.productId)}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="cart-summary-fees-note">
              Platform fees are calculated per vendor tier at checkout.
            </p>
            <div className="cart-summary-row cart-summary-total">
              <span>Estimated Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <Link to="/shop" className="cart-continue-link">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
