import type { User } from '../auth/types';

export const MOCK_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'buyer@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-buyer-001',
      email: 'buyer@demo.com',
      displayName: 'Demo Buyer',
      role: 'buyer',
      createdAt: '2026-01-15T00:00:00Z',
    },
  },
  {
    email: 'vendor@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-vendor-001',
      email: 'vendor@demo.com',
      displayName: 'Sankofa Soap',
      role: 'vendor',
      vendorId: 'mock-vendor-record-001',
      createdAt: '2026-01-10T00:00:00Z',
    },
  },
  {
    email: 'mogul@demo.com',
    password: 'demo123',
    user: {
      id: 'mock-vendor-002',
      email: 'mogul@demo.com',
      displayName: "Effie's Boutique",
      role: 'vendor',
      vendorId: 'mock-vendor-record-002',
      createdAt: '2026-01-05T00:00:00Z',
    },
  },
];

const SESSION_KEY = '@gbm_mock_session';
const USERS_KEY = '@gbm_mock_users';

function getStoredUsers(): Array<{ email: string; password: string; user: User }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
  return [...MOCK_USERS];
}

export function findMockUser(email: string, password: string): User | null {
  const users = getStoredUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return match ? match.user : null;
}

export function createMockUser(
  email: string,
  password: string,
  meta?: Record<string, unknown>
): User {
  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) throw new Error('An account with this email already exists.');

  const newUser: User = {
    id: `mock-${Date.now()}`,
    email,
    displayName: (meta?.displayName as string) || email.split('@')[0],
    role: (meta?.role as 'buyer' | 'vendor') || 'buyer',
    createdAt: new Date().toISOString(),
  };

  users.push({ email, password, user: newUser });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

export function getMockSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function setMockSession(user: User | null): void {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}
