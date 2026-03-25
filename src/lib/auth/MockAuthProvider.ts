import type { IAuthProvider } from './IAuthProvider';
import type { User } from './types';
import {
  findMockUser,
  createMockUser,
  getMockSession,
  setMockSession,
} from '../mock/mockUsers';

export class MockAuthProvider implements IAuthProvider {
  private listeners: Set<(user: User | null) => void> = new Set();

  async signIn(email: string, password: string): Promise<User> {
    const user = findMockUser(email, password);
    if (!user) throw new Error('Invalid email or password.');
    setMockSession(user);
    this.notify(user);
    return user;
  }

  async signUp(
    email: string,
    password: string,
    meta?: Record<string, unknown>
  ): Promise<User> {
    const user = createMockUser(email, password, meta);
    setMockSession(user);
    this.notify(user);
    return user;
  }

  async signOut(): Promise<void> {
    setMockSession(null);
    this.notify(null);
  }

  async getSession(): Promise<User | null> {
    return getMockSession();
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify(user: User | null): void {
    this.listeners.forEach((cb) => cb(user));
  }
}
