'use client';
import { useState, useCallback } from 'react';
import {
  getShelters,
  deleteShelter,
  addShelter,
  updateShelter,
} from '@/lib/actions/shelter';
import type { Shelter, Prisma } from '@prisma/client';
import type { ActionResult } from '@/types/models';
import useOnMount from '@/src/hooks/useOnMount';
import type { GetSheltersParams } from '@/lib/actions/shelter.schema';

/** Hook for fetching shelters */
export function useShelters(params: GetSheltersParams = {}) {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShelters = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getShelters(params);
      if (result.success) {
        setShelters(result.data.shelters);
        setTotalCount(result.data.total);
      } else {
        setError('Failed to fetch shelters');
      }
    } catch (error: unknown) {
      console.error('Error fetching shelters:', error);
      setError('An error occurred while fetching shelters');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useOnMount(() => {
    fetchShelters();
  });

  return { shelters, totalCount, loading, error, refetch: fetchShelters };
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
      }
    } catch (error: unknown) {
      console.error('Error deleting shelter:', error);
      setError('An error occurred while deleting the shelter');
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}

export function useAddShelter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddShelter = async (shelter: Prisma.ShelterCreateInput) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addShelter(shelter);
      if (result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        setError('Failed to add shelter');
      }
    } catch (error: unknown) {
      console.error('Error adding shelter:', error);
      setError('An error occurred while adding the shelter');
      return { success: false, message: 'Error occurred', error };
    } finally {
      setLoading(false);
    }
  };

  return { handleAddShelter, loading, error, success };
}

export function useUpdateShelter() {
  const [loading, setLoading] = useState(false);

  const handleUpdateShelter = async (
    id: string,
    data: Prisma.ShelterUpdateInput,
  ): Promise<ActionResult<Shelter>> => {
    setLoading(true);
    const result = await updateShelter(id, data);
    setLoading(false);
    return result;
  };

  return { handleUpdateShelter, loading };
}
