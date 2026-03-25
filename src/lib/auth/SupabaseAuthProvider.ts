import type { IAuthProvider } from './IAuthProvider';
import type { User } from './types';
import { supabase } from '../supabase';

function mapUser(supabaseUser: { id: string; email?: string }, profile?: Record<string, unknown>): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    displayName: (profile?.display_name as string) || supabaseUser.email?.split('@')[0] || '',
    avatarUrl: (profile?.avatar_url as string) || undefined,
    role: (profile?.role as User['role']) || 'buyer',
    vendorId: (profile?.vendor_id as string) || undefined,
    createdAt: (profile?.created_at as string) || new Date().toISOString(),
  };
}

async function fetchProfile(userId: string): Promise<Record<string, unknown> | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

export class SupabaseAuthProvider implements IAuthProvider {
  async signIn(email: string, password: string): Promise<User> {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) throw new Error(error?.message || 'Sign in failed.');
    const profile = await fetchProfile(data.user.id);
    return mapUser(data.user, profile || undefined);
  }

  async signUp(
    email: string,
    password: string,
    meta?: Record<string, unknown>
  ): Promise<User> {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: meta?.displayName || email.split('@')[0],
          role: meta?.role || 'buyer',
        },
      },
    });
    if (error || !data.user) throw new Error(error?.message || 'Sign up failed.');
    const profile = await fetchProfile(data.user.id);
    return mapUser(data.user, profile || undefined);
  }

  async signOut(): Promise<void> {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async getSession(): Promise<User | null> {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) return null;
    const profile = await fetchProfile(data.session.user.id);
    return mapUser(data.session.user, profile || undefined);
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!supabase) return () => {};
    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        callback(null);
        return;
      }
      const profile = await fetchProfile(session.user.id);
      callback(mapUser(session.user, profile || undefined));
    });
    return () => data.subscription.unsubscribe();
  }
}
