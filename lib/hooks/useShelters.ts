'use client';
import { use } from 'react';
import { useState, useEffect } from 'react';
import { getShelters } from '@/lib/actions/shelter';
import type { Shelter } from '@prisma/client';

/** Hook for fetching shelters */
export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const result = await getShelters();
        if (result.success) {
          setShelters(result.data);
        } else {
          setError('Failed to fetch shelters');
        }
      } catch (err) {
        setError('An error occurred while fetching shelters');
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  return { shelters, loading, error };
}
