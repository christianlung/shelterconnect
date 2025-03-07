'use client';
import { useState, useEffect } from 'react';
import { getShelters, deleteShelter } from '@/lib/actions/shelter';
import type { Shelter } from '@prisma/client';
import type { ActionResult } from '@/types/models';

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

/** Hook for deleting specific shelter */
export function useDeleteShelter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteShelter(id);
      if (!result.success) {
        setError('Failed to delete shelter');
        console.log('Failed to delete shelter');
      }
    } catch (err) {
      setError('An error occurred while deleting the shelter');
      console.log('An error occurred while deleting the shelter');
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}