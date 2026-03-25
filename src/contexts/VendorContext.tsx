import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Vendor, Product, Order, OrderStatus, VendorTier } from '@/types';
import { TIER_CONFIG } from '@/types';
import { useVendor } from '@/hooks/useVendor';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { MOCK_VENDOR_RECORDS } from '@/lib/mock/mockVendors';

interface VendorContextValue {
  vendor: Vendor | null;
  products: Product[];
  orders: Order[];
  productCount: number;
  canAddProduct: boolean;
  listingLimit: number;
  addProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateVendor: (updates: Partial<Vendor>) => void;
  updateVendorTier: (tier: VendorTier) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isLoading: boolean;
  error: string | null;
  refetchVendor: () => void;
}

const VendorContext = createContext<VendorContextValue | null>(null);

export function VendorProvider({ children }: { children: ReactNode }) {
  const { vendor, isLoading: vendorLoading, error, refetch: refetchVendor } = useVendor();

  const {
    products,
    productCount,
    canAddProduct,
    listingLimit,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoading: productsLoading,
  } = useProducts(vendor?.id, vendor?.listingLimit);

  const {
    orders,
    updateOrderStatus,
    isLoading: ordersLoading,
  } = useOrders(vendor?.id);

  const isLoading = vendorLoading || productsLoading || ordersLoading;

  // Vendor profile updates persist to the mock vendor record in-memory.
  // In a real backend this would call an API. For now the vendor object
  // is read-only from the mock layer; a full updateVendor would require
  // a persistence function in mockVendors. This stub is provided so
  // existing consumers compile without changes.
  const updateVendor = useCallback(
    (_updates: Partial<Vendor>) => {
      // TODO: persist vendor updates through mock layer when needed
      refetchVendor();
    },
    [refetchVendor],
  );

  const updateVendorTier = useCallback(
    (tier: VendorTier) => {
      const cfg = TIER_CONFIG[tier];
      // In mock mode we import and mutate the record directly so that
      // refetch picks up the new values without a backend round-trip.
      if (vendor) {
        const record = MOCK_VENDOR_RECORDS.find((v) => v.id === vendor.id);
        if (record) {
          record.tier = tier;
          record.platformFeePct = cfg.fee;
          record.listingLimit = cfg.limit;
        }
      }
      refetchVendor();
    },
    [vendor, refetchVendor],
  );

  return (
    <VendorContext.Provider
      value={{
        vendor,
        products,
        orders,
        productCount,
        canAddProduct,
        listingLimit,
        addProduct,
        updateProduct,
        deleteProduct,
        updateVendor,
        updateVendorTier,
        updateOrderStatus,
        isLoading,
        error,
        refetchVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}

export function useVendorContext(): VendorContextValue {
  const ctx = useContext(VendorContext);
  if (!ctx) {
    throw new Error('useVendorContext must be used within a VendorProvider');
  }
  return ctx;
}
