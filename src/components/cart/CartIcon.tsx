import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link to="/cart" className="cart-icon" aria-label={`Cart with ${itemCount} items`}>
      &#128722;
      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
    </Link>
  );
}
