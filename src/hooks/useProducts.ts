import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';
import {
  getMockProductsByVendorId,
  saveMockProduct,
  deleteMockProduct as deleteMockProductById,
} from '@/lib/mock/mockProducts';

interface UseProductsReturn {
  products: Product[];
  productCount: number;
  canAddProduct: boolean;
  listingLimit: number;
  addProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  isLoading: boolean;
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useProducts(vendorId: string | undefined, listingLimitOverride?: number): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const listingLimit = listingLimitOverride ?? Infinity;

  const loadProducts = useCallback(() => {
    if (!vendorId) {
      setProducts([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = getMockProductsByVendorId(vendorId);
      setProducts(data);
    } finally {
      setIsLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = useCallback(
    (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString();
      const product: Product = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      saveMockProduct(product);
      loadProducts();
    },
    [loadProducts],
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      const existing = products.find((p) => p.id === id);
      if (!existing) return;
      const updated: Product = {
        ...existing,
        ...updates,
        id, // preserve id
        updatedAt: new Date().toISOString(),
      };
      saveMockProduct(updated);
      loadProducts();
    },
    [products, loadProducts],
  );

  const deleteProduct = useCallback(
    (productId: string) => {
      deleteMockProductById(productId);
      loadProducts();
    },
    [loadProducts],
  );

  return {
    products,
    productCount: products.length,
    canAddProduct: products.length < listingLimit,
    listingLimit,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoading,
  };
}
