export type VendorTier = 'Griot' | 'Merchant' | 'Mogul';
export type CategorySlug = 'fashion' | 'jewelry' | 'wellness' | 'art' | 'food' | 'home' | 'music' | 'books';

export interface Category {
  slug: CategorySlug;
  label: string;
  emoji: string;
}

export interface StaticVendor {
  id: number;
  name: string;
  location: string;
  category: string;
  desc: string;
  avatar: string;
  banner: 'green' | 'red' | 'tan';
  products: number;
  rating: number;
  sales: string;
  tier: VendorTier;
  verified: boolean;
  featured: boolean;
}

export interface StaticProduct {
  id: string;
  vendorName: string;
  name: string;
  price: number;
  rating: number;
  country: string;
  countryFlag: string;
  category: CategorySlug;
  image: string;
}

// ── Full domain types (Phase 2+) ──

export type ProductType = 'physical' | 'digital' | 'service';
export type OrderStatus = 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Vendor {
  id: string;
  userId: string;
  storefrontName: string;
  slug: string;
  bio?: string;
  bannerUrl?: string;
  avatarUrl?: string;
  country: string;
  categoryId?: string;
  tier: VendorTier;
  platformFeePct: number;
  listingLimit: number;
  isVerified: boolean;
  isFeatured: boolean;
  stripeAccountId?: string;
  stripeSubscriptionId?: string;
  totalSales: number;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  vendorId: string;
  categoryId: string;
  categorySlug?: CategorySlug;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  sku?: string;
  stockQuantity?: number;
  productType: ProductType;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  avgRating: number;
  totalReviews: number;
  totalSold: number;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName?: string;
  status: OrderStatus;
  subtotal: number;
  platformFee: number;
  total: number;
  stripePaymentIntentId?: string;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  vendorId: string;
  quantity: number;
  unitPrice: number;
  platformFeePct: number;
  platformFeeAmount: number;
  vendorPayout: number;
  product?: Pick<Product, 'name' | 'images'>;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  vendorId: string;
  rating: number;
  title?: string;
  body?: string;
  createdAt: string;
  buyer?: { displayName: string; avatarUrl?: string };
}

export const TIER_CONFIG: Record<VendorTier, { fee: number; limit: number; monthly: number }> = {
  Griot: { fee: 20, limit: 10, monthly: 0 },
  Merchant: { fee: 10, limit: 100, monthly: 49 },
  Mogul: { fee: 4, limit: Infinity, monthly: 200 },
};
