import type { User } from './types';
import { getAuthProvider } from './index';

/**
 * Shared identity function — single source of truth for the current user.
 * All auth goes through IAuthProvider. No direct Supabase calls in components.
 */
export async function getCurrentUser(): Promise<User | null> {
  const provider = getAuthProvider();
  return provider.getSession();
}
