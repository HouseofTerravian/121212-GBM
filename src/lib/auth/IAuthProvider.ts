import type { User } from './types';

export interface IAuthProvider {
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, meta?: Record<string, unknown>): Promise<User>;
  signOut(): Promise<void>;
  getSession(): Promise<User | null>;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
  handleCallback?(params: URLSearchParams): Promise<User | null>;
}
