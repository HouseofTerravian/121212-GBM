import type { Order, OrderStatus } from '@/types';

const STORAGE_KEY = '@gbm_mock_orders';

// -- Seed data: 8 orders for vendor mock-vendor-record-001 --

const SEED_ORDERS: Order[] = [
  {
    id: 'order-001',
    buyerId: 'buyer-a01',
    buyerName: 'Ama Kwarteng',
    status: 'paid',
    subtotal: 36.99,
    platformFee: 3.70,
    total: 36.99,
    shippingAddress: {
      name: 'Ama Kwarteng',
      line1: '142 Liberation Ave',
      city: 'Accra',
      state: 'Greater Accra',
      postalCode: 'GA-100',
      country: 'Ghana',
    },
    items: [
      {
        id: 'oi-001a',
        orderId: 'order-001',
        productId: 'prod-001',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 24.99,
        platformFeePct: 10,
        platformFeeAmount: 2.50,
        vendorPayout: 22.49,
        product: { name: 'Raw Shea Body Butter', images: [{ id: 'img-001', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
      {
        id: 'oi-001b',
        orderId: 'order-001',
        productId: 'prod-002',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 12.00,
        platformFeePct: 10,
        platformFeeAmount: 1.20,
        vendorPayout: 10.80,
        product: { name: 'African Black Soap Bar', images: [{ id: 'img-002', url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-01T14:20:00Z',
    updatedAt: '2026-03-01T14:20:00Z',
  },
  {
    id: 'order-002',
    buyerId: 'buyer-a02',
    buyerName: 'Kofi Mensah',
    status: 'paid',
    subtotal: 28.00,
    platformFee: 2.80,
    total: 28.00,
    shippingAddress: {
      name: 'Kofi Mensah',
      line1: '88 Oxford St',
      city: 'London',
      state: 'England',
      postalCode: 'W1D 1BS',
      country: 'UK',
    },
    items: [
      {
        id: 'oi-002a',
        orderId: 'order-002',
        productId: 'prod-003',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 28.00,
        platformFeePct: 10,
        platformFeeAmount: 2.80,
        vendorPayout: 25.20,
        product: { name: 'Moringa Oil — Cold Pressed', images: [{ id: 'img-003', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-04T09:15:00Z',
    updatedAt: '2026-03-04T09:15:00Z',
  },
  {
    id: 'order-003',
    buyerId: 'buyer-a03',
    buyerName: 'Nana Osei',
    status: 'processing',
    subtotal: 46.00,
    platformFee: 4.60,
    total: 46.00,
    shippingAddress: {
      name: 'Nana Osei',
      line1: '22 MLK Blvd',
      city: 'Atlanta',
      state: 'GA',
      postalCode: '30303',
      country: 'USA',
    },
    items: [
      {
        id: 'oi-003a',
        orderId: 'order-003',
        productId: 'prod-007',
        vendorId: 'mock-vendor-record-001',
        quantity: 2,
        unitPrice: 14.00,
        platformFeePct: 10,
        platformFeeAmount: 2.80,
        vendorPayout: 25.20,
        product: { name: 'Turmeric Glow Soap', images: [{ id: 'img-007', url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
      {
        id: 'oi-003b',
        orderId: 'order-003',
        productId: 'prod-006',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 22.00,
        platformFeePct: 10,
        platformFeeAmount: 2.20,
        vendorPayout: 19.80,
        product: { name: 'Neem & Tea Tree Scalp Oil', images: [{ id: 'img-006', url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-08T11:30:00Z',
    updatedAt: '2026-03-09T08:00:00Z',
  },
  {
    id: 'order-004',
    buyerId: 'buyer-a04',
    buyerName: 'Abena Darko',
    status: 'processing',
    subtotal: 72.00,
    platformFee: 7.20,
    total: 72.00,
    shippingAddress: {
      name: 'Abena Darko',
      line1: '5 Cantonments Rd',
      city: 'Accra',
      state: 'Greater Accra',
      postalCode: 'GA-200',
      country: 'Ghana',
    },
    items: [
      {
        id: 'oi-004a',
        orderId: 'order-004',
        productId: 'prod-008',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 72.00,
        platformFeePct: 10,
        platformFeeAmount: 7.20,
        vendorPayout: 64.80,
        product: { name: 'Sankofa Gift Set — 4 Piece', images: [{ id: 'img-008', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-10T16:45:00Z',
    updatedAt: '2026-03-11T10:00:00Z',
  },
  {
    id: 'order-005',
    buyerId: 'buyer-a05',
    buyerName: 'Yaw Asante',
    status: 'shipped',
    subtotal: 24.99,
    platformFee: 2.50,
    total: 24.99,
    trackingNumber: 'GH1234567890',
    trackingUrl: 'https://tracking.example.com/GH1234567890',
    shippingAddress: {
      name: 'Yaw Asante',
      line1: '300 Harlem Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10027',
      country: 'USA',
    },
    items: [
      {
        id: 'oi-005a',
        orderId: 'order-005',
        productId: 'prod-001',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 24.99,
        platformFeePct: 10,
        platformFeeAmount: 2.50,
        vendorPayout: 22.49,
        product: { name: 'Raw Shea Body Butter', images: [{ id: 'img-001', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-12T13:00:00Z',
    updatedAt: '2026-03-14T09:30:00Z',
  },
  {
    id: 'order-006',
    buyerId: 'buyer-a06',
    buyerName: 'Esi Boateng',
    status: 'shipped',
    subtotal: 64.00,
    platformFee: 6.40,
    total: 64.00,
    trackingNumber: 'GH9876543210',
    trackingUrl: 'https://tracking.example.com/GH9876543210',
    shippingAddress: {
      name: 'Esi Boateng',
      line1: '19 Rue de Paris',
      city: 'Dakar',
      state: 'Dakar',
      postalCode: '10200',
      country: 'Senegal',
    },
    items: [
      {
        id: 'oi-006a',
        orderId: 'order-006',
        productId: 'prod-004',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 32.00,
        platformFeePct: 10,
        platformFeeAmount: 3.20,
        vendorPayout: 28.80,
        product: { name: 'Shea + Cocoa Whipped Cream', images: [{ id: 'img-004', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
      {
        id: 'oi-006b',
        orderId: 'order-006',
        productId: 'prod-005',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 36.00,
        platformFeePct: 10,
        platformFeeAmount: 3.60,
        vendorPayout: 32.40,
        product: { name: 'Baobab Seed Facial Serum', images: [{ id: 'img-005', url: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-15T10:20:00Z',
    updatedAt: '2026-03-17T14:00:00Z',
  },
  {
    id: 'order-007',
    buyerId: 'buyer-a07',
    buyerName: 'Kwame Adjei',
    status: 'delivered',
    subtotal: 50.99,
    platformFee: 5.10,
    total: 50.99,
    trackingNumber: 'GH5555555555',
    trackingUrl: 'https://tracking.example.com/GH5555555555',
    shippingAddress: {
      name: 'Kwame Adjei',
      line1: '47 Independence Ave',
      city: 'Kumasi',
      state: 'Ashanti',
      postalCode: 'AK-100',
      country: 'Ghana',
    },
    items: [
      {
        id: 'oi-007a',
        orderId: 'order-007',
        productId: 'prod-001',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 24.99,
        platformFeePct: 10,
        platformFeeAmount: 2.50,
        vendorPayout: 22.49,
        product: { name: 'Raw Shea Body Butter', images: [{ id: 'img-001', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
      {
        id: 'oi-007b',
        orderId: 'order-007',
        productId: 'prod-003',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 28.00,
        platformFeePct: 10,
        platformFeeAmount: 2.80,
        vendorPayout: 25.20,
        product: { name: 'Moringa Oil — Cold Pressed', images: [{ id: 'img-003', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2026-03-02T16:30:00Z',
  },
  {
    id: 'order-008',
    buyerId: 'buyer-a08',
    buyerName: 'Akua Serwaa',
    status: 'cancelled',
    subtotal: 14.00,
    platformFee: 1.40,
    total: 14.00,
    notes: 'Customer requested cancellation before shipment.',
    shippingAddress: {
      name: 'Akua Serwaa',
      line1: '600 Peachtree St',
      city: 'Atlanta',
      state: 'GA',
      postalCode: '30308',
      country: 'USA',
    },
    items: [
      {
        id: 'oi-008a',
        orderId: 'order-008',
        productId: 'prod-007',
        vendorId: 'mock-vendor-record-001',
        quantity: 1,
        unitPrice: 14.00,
        platformFeePct: 10,
        platformFeeAmount: 1.40,
        vendorPayout: 12.60,
        product: { name: 'Turmeric Glow Soap', images: [{ id: 'img-007', url: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&h=400&fit=crop', sortOrder: 0 }] },
      },
    ],
    createdAt: '2026-03-18T12:00:00Z',
    updatedAt: '2026-03-18T15:45:00Z',
  },
];

// -- localStorage persistence layer --

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupted data — reset
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS));
  return [...SEED_ORDERS];
}

function persistOrders(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// -- Public API --

export function getMockOrdersByVendorId(vendorId: string): Order[] {
  return loadOrders().filter((order) =>
    order.items.some((item) => item.vendorId === vendorId)
  );
}

export function getMockOrderById(orderId: string): Order | undefined {
  return loadOrders().find((o) => o.id === orderId);
}

export function updateMockOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx >= 0) {
    orders[idx] = {
      ...orders[idx],
      status,
      updatedAt: new Date().toISOString(),
    };
    persistOrders(orders);
  }
}
