'use client';
import { useState, useEffect } from 'react';
import { getShelters, deleteShelter, addShelter, updateShelter } from '@/lib/actions/shelter';
import type { Shelter } from '@prisma/client';
import type { ActionResult } from '@/types/models';

/** Hook for fetching shelters */
export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShelters = async () => {
    setLoading(true);
    try {
      const result = await getShelters();
      if (result.success) {
        console.log("Fetched shelters: ", result.data);
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

  useEffect(() => {
    fetchShelters();
  }, []);
  
  return { shelters, loading, error, refetch: fetchShelters };
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

export function useAddShelter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddShelter = async (shelter: any) => {
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
    } catch (err) {
      setError('An error occurred while adding the shelter');
      console.error('Error adding shelter:', err);
      return { success: false, message: 'Error occurred', error: err };
    } finally {
      setLoading(false);
    }
  };

  return { handleAddShelter, loading, error, success };
}

export function useUpdateShelter() {
  const [loading, setLoading] = useState(false);

  const handleUpdateShelter = async (id: string, data: any): Promise<ActionResult<Shelter>> => {
    setLoading(true);
    const result = await updateShelter(id, data);
    setLoading(false);
    return result;
  }
  
  return { handleUpdateShelter, loading };
}