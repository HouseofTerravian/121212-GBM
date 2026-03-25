import { useState, useEffect, useCallback } from 'react';
import type { Order, OrderStatus } from '@/types';
import {
  getMockOrdersByVendorId,
  updateMockOrderStatus,
} from '@/lib/mock/mockOrders';

interface UseOrdersReturn {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isLoading: boolean;
}

export function useOrders(vendorId: string | undefined): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(() => {
    if (!vendorId) {
      setOrders([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = getMockOrdersByVendorId(vendorId);
      setOrders(data);
    } finally {
      setIsLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      updateMockOrderStatus(orderId, status);
      loadOrders();
    },
    [loadOrders],
  );

  return { orders, updateOrderStatus, isLoading };
}
