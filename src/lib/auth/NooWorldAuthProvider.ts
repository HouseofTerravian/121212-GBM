import type { IAuthProvider } from './IAuthProvider';
import type { User } from './types';

const NW_BASE = 'https://id.thenooworld.com';
const TOKEN_KEY = '@gbm_nw_token';
const USER_KEY = '@gbm_nw_user';

export class NooWorldAuthProvider implements IAuthProvider {
  private listeners: Set<(user: User | null) => void> = new Set();

  async signIn(_email: string, _password: string): Promise<User> {
    // Redirect-based: email/password not used directly.
    // Redirect to Noo World login with return URL.
    const url = new URL(`${NW_BASE}/login`);
    url.searchParams.set('redirect', `${window.location.origin}/auth/callback`);
    url.searchParams.set('app', '121212-gbm');
    window.location.href = url.toString();
    // This promise never resolves since we navigate away
    return new Promise(() => {});
  }

  async signUp(_email: string, _password: string, _meta?: Record<string, unknown>): Promise<User> {
    const url = new URL(`${NW_BASE}/register`);
    url.searchParams.set('redirect', `${window.location.origin}/auth/callback`);
    url.searchParams.set('app', '121212-gbm');
    window.location.href = url.toString();
    return new Promise(() => {});
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.notify(null);
  }

  async getSession(): Promise<User | null> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const raw = localStorage.getItem(USER_KEY);
      if (!token || !raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  async handleCallback(params: URLSearchParams): Promise<User | null> {
    const token = params.get('token');
    const userRaw = params.get('user');
    if (!token || !userRaw) return null;

    try {
      const nwUser = JSON.parse(decodeURIComponent(userRaw));
      const user: User = {
        id: nwUser.id,
        email: nwUser.email,
        displayName: nwUser.display_name || nwUser.email?.split('@')[0] || '',
        avatarUrl: nwUser.avatar_url,
        role: nwUser.role || 'buyer',
        createdAt: nwUser.created_at || new Date().toISOString(),
      };
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.notify(user);
      return user;
    } catch {
      return null;
    }
  }

  private notify(user: User | null): void {
    this.listeners.forEach((cb) => cb(user));
  }
}
