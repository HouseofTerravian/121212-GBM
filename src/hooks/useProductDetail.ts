import { useMemo } from 'react';
import { getMockProductById } from '@/lib/mock/mockProducts';
import { getMockVendorById } from '@/lib/mock/mockVendors';
import { VENDORS } from '@/data/vendors';
import type { Product, Vendor } from '@/types';

interface UseProductDetailResult {
  product: Product | undefined;
  vendor: Vendor | undefined;
  isLoading: boolean;
}

export function useProductDetail(productId: string): UseProductDetailResult {
  const result = useMemo(() => {
    const product = getMockProductById(productId);
    if (!product) return { product: undefined, vendor: undefined };

    // Try mock vendor records first
    let vendor = getMockVendorById(product.vendorId);

    // Fallback: build a minimal Vendor-like object from static VENDORS data
    if (!vendor) {
      const staticVendor = VENDORS.find((v) => {
        const slug = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          v.name === product.vendorId ||
          slug === product.vendorId ||
          `other-vendor-${String(v.id).padStart(3, '0')}` === product.vendorId
        );
      });

      if (staticVendor) {
        // Strip flag emoji prefix from location to get country
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
      }
    }

    return { product, vendor };
  }, [productId]);

  return { ...result, isLoading: false };
}
