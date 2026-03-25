import { useMemo } from 'react';
import { getAllMockProducts } from '@/lib/mock/mockProducts';
import { getMockVendorById } from '@/lib/mock/mockVendors';
import type { Product, CategorySlug } from '@/types';

export interface ShopFilters {
  search: string;
  category: string; // 'all' or CategorySlug
  sortBy: string; // 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling'
}

interface UseShopProductsResult {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
  isLoading: boolean;
}

export function useShopProducts(
  filters: ShopFilters,
  page: number,
  perPage: number
): UseShopProductsResult {
  const result = useMemo(() => {
    let items = getAllMockProducts().filter((p) => p.isActive);

    // Search filter: match against name, description, and vendor name
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => {
        if (p.name.toLowerCase().includes(q)) return true;
        if (p.description.toLowerCase().includes(q)) return true;
        // Try to resolve vendor name for search
        const vendor = getMockVendorById(p.vendorId);
        if (vendor && vendor.storefrontName.toLowerCase().includes(q)) return true;
        return false;
      });
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      const cat = filters.category as CategorySlug;
      items = items.filter((p) => p.categorySlug === cat);
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case 'best-selling':
        items.sort((a, b) => b.totalSold - a.totalSold);
        break;
      case 'featured':
      default:
        items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    const totalCount = items.length;
    const end = page * perPage;
    const paginated = items.slice(0, end);
    const hasMore = end < totalCount;

    return { products: paginated, totalCount, hasMore };
  }, [filters.search, filters.category, filters.sortBy, page, perPage]);

  return { ...result, isLoading: false };
}
