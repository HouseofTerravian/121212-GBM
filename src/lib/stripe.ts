import type { CartItem } from '@/contexts/CartContext';

const ORDERS_KEY = '@gbm_mock_buyer_orders';
const CART_KEY = '@gbm_cart';

interface MockOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  createdAt: string;
}

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GBM-${ts}-${rand}`;
}

export async function createCheckoutSession(
  items: CartItem[],
  buyerId: string
): Promise<{ orderId: string }> {
  // Mock mode: simulate checkout
  const orderId = generateOrderId();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order: MockOrder = {
    orderId,
    items: [...items],
    subtotal,
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  const existing = localStorage.getItem(ORDERS_KEY);
  const orders: MockOrder[] = existing ? JSON.parse(existing) : [];
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Clear cart
  localStorage.removeItem(CART_KEY);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // buyerId will be used when Stripe is configured
  void buyerId;

  return { orderId };
}
