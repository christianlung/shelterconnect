'use client';
import { use } from 'react';
import { getShelters } from '@/lib/actions/shelter';
import type { Shelter } from '@prisma/client';

/** Hook for fetching shelters */
export function useShelters(): Shelter[] {
  const result = use(getShelters());

  if (!result.success) {
    // TODO: Add better client-visible error handling.
    console.error('[ShelterList] Failed to fetch shelters');
    return [];
  }

  return result.data;
}
