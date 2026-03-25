import { useState, useEffect } from 'react';
import type { CartItem } from '@/contexts/CartContext';

const ORDERS_KEY = '@gbm_mock_buyer_orders';

interface StoredOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  createdAt: string;
}

export interface BuyerOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: 'paid' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

function parseOrders(): BuyerOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const stored: StoredOrder[] = JSON.parse(raw);
    return stored.map((o) => ({
      id: o.orderId,
      items: o.items,
      subtotal: o.subtotal,
      total: o.subtotal,
      status: 'paid' as const,
      createdAt: o.createdAt,
    }));
  } catch {
    return [];
  }
}

export function useBuyerOrders(): { orders: BuyerOrder[]; isLoading: boolean } {
  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrders(parseOrders());
    setIsLoading(false);
  }, []);

  return { orders, isLoading };
}
