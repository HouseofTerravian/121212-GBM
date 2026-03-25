import { useState, useEffect, useCallback } from 'react';
import type { Vendor } from '@/types';
import { useAuth } from '@/lib/auth/AuthContext';
import { getMockVendorByUserId } from '@/lib/mock/mockVendors';

interface UseVendorReturn {
  vendor: Vendor | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useVendor(): UseVendorReturn {
  const { user, isLoading: authLoading } = useAuth();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendor = useCallback(() => {
    if (!user) {
      setVendor(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock mode: resolve from local mock data
      const record = getMockVendorByUserId(user.id);
      if (record) {
        setVendor(record);
      } else {
        setVendor(null);
        setError('No vendor record found for this account.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vendor data.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchVendor();
    }
  }, [authLoading, fetchVendor]);

  return { vendor, isLoading: isLoading || authLoading, error, refetch: fetchVendor };
}
