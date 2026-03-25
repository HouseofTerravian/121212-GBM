import type { Vendor } from '@/types';

export const MOCK_VENDOR_RECORDS: Vendor[] = [
  {
    id: 'mock-vendor-record-001',
    userId: 'mock-vendor-001',
    storefrontName: 'Sankofa Soap',
    slug: 'sankofa-soap',
    bio: 'Handcrafted African black soap, shea butters, and wellness oils rooted in traditional Ghanaian recipes.',
    country: 'Ghana',
    tier: 'Merchant',
    platformFeePct: 10,
    listingLimit: 100,
    isVerified: true,
    isFeatured: true,
    totalSales: 1200,
    avgRating: 4.8,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-03-20T00:00:00Z',
  },
  {
    id: 'mock-vendor-record-002',
    userId: 'mock-vendor-002',
    storefrontName: "Effie's Boutique",
    slug: 'effies-boutique',
    bio: 'Afrocentric fashion blending Angolan heritage with contemporary silhouettes.',
    country: 'Angola',
    tier: 'Mogul',
    platformFeePct: 4,
    listingLimit: Infinity,
    isVerified: true,
    isFeatured: true,
    totalSales: 3400,
    avgRating: 5.0,
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-03-18T00:00:00Z',
  },
];

export function getMockVendorByUserId(userId: string): Vendor | undefined {
  return MOCK_VENDOR_RECORDS.find((v) => v.userId === userId);
}

export function getMockVendorById(vendorId: string): Vendor | undefined {
  return MOCK_VENDOR_RECORDS.find((v) => v.id === vendorId);
}
