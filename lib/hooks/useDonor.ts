'use client';
import { use } from 'react'; 
import { getDonor } from '@/lib/actions/donor';
import type { Donor } from '@prisma/client';

export function useDonor(): Donor[] {
  // Call the server-side fetch function here
  const result = use(getDonor());

  if (!result.success) {
    console.error('[DonorList] Failed to fetch donors');
    return [];
  }

  return result.data;
}
