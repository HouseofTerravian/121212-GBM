import type { IAuthProvider } from './IAuthProvider';
import { MockAuthProvider } from './MockAuthProvider';
import { SupabaseAuthProvider } from './SupabaseAuthProvider';
import { NooWorldAuthProvider } from './NooWorldAuthProvider';
import { isSupabaseReady } from '../supabase';

let _provider: IAuthProvider | null = null;

function buildProvider(): IAuthProvider {
  const setting = import.meta.env.VITE_AUTH_PROVIDER as string | undefined;

  if (setting === 'nooworld') {
    return new NooWorldAuthProvider();
  }

  if (setting === 'supabase' && isSupabaseReady) {
    return new SupabaseAuthProvider();
  }

  // If VITE_AUTH_PROVIDER=supabase but env vars are missing, fall back to mock
  if (isSupabaseReady && !setting) {
    return new SupabaseAuthProvider();
  }

  return new MockAuthProvider();
}

export function getAuthProvider(): IAuthProvider {
  if (!_provider) {
    _provider = buildProvider();
  }
  return _provider;
}

export { getCurrentUser } from './getCurrentUser';
export type { IAuthProvider } from './IAuthProvider';
export type { User, UserRole, AuthState } from './types';
