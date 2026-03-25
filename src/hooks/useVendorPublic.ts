import { useMemo } from 'react';
import { MOCK_VENDOR_RECORDS } from '@/lib/mock/mockVendors';
import { getMockProductsByVendorId, getAllMockProducts } from '@/lib/mock/mockProducts';
import { VENDORS } from '@/data/vendors';
import type { Product, Vendor } from '@/types';

interface UseVendorPublicResult {
  vendor: Vendor | undefined;
  products: Product[];
  isLoading: boolean;
}

export function useVendorPublic(slug: string): UseVendorPublicResult {
  const result = useMemo(() => {
    // Check mock vendor records first
    let vendor = MOCK_VENDOR_RECORDS.find((v) => v.slug === slug);
    let products: Product[] = [];

    if (vendor) {
      products = getMockProductsByVendorId(vendor.id).filter((p) => p.isActive);
      return { vendor, products };
    }

    // Fallback: check static VENDORS and build a Vendor-like object
    const staticVendor = VENDORS.find((v) => {
      const vendorSlug = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return vendorSlug === slug;
    });

    if (staticVendor) {
      const country = staticVendor.location.replace(/^[^\s]+\s*/, '');
      vendor = {
        id: `static-vendor-${staticVendor.id}`,
        userId: `static-user-${staticVendor.id}`,
        storefrontName: staticVendor.name,
        slug: staticVendor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        bio: staticVendor.desc,
        country,
        tier: staticVendor.tier,
        platformFeePct: staticVendor.tier === 'Mogul' ? 4 : staticVendor.tier === 'Merchant' ? 10 : 20,
        listingLimit: staticVendor.tier === 'Mogul' ? Infinity : staticVendor.tier === 'Merchant' ? 100 : 10,
        isVerified: staticVendor.verified,
        isFeatured: staticVendor.featured,
        totalSales: 0,
        avgRating: staticVendor.rating,
        avatarUrl: staticVendor.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Try to find products that belong to this vendor by matching vendor name in all products
      const allProducts = getAllMockProducts();
      products = allProducts.filter((p) => {
        // Direct match on vendorId
        if (p.vendorId === vendor!.id) return true;
        return false;
      }).filter((p) => p.isActive);
    }

    return { vendor, products };
  }, [slug]);

  return { ...result, isLoading: false };
}
