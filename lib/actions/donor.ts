'use server';

import { prisma } from '@/lib/prisma';
import type { Donor } from '@prisma/client';
import type { ActionResult } from '@/types/models';
import { revalidateTag } from 'next/cache';

/**
 * Action that creates a new donor in the database
 */
export async function createDonor(donorName: string, finalDonorAmount: string): Promise<ActionResult<Donor>> {
  try {
    const newDonor = await prisma.donor.create({
      data: { donorName, finalDonorAmount },
    });

    revalidateTag('donors')

    return { success: true, data: newDonor };
  } catch (error) {
    console.error('[CreateDonor] Error:', error);
    return { success: false };
  }
}

/**
 * Action that fetches all donors from the database
 */
export async function getDonor(): Promise<ActionResult<Donor[]>> {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: {
        finalDonorAmount: 'desc', 
      },
    });
    return { success: true, data: donors };
  } catch (error) {
    console.error("[getDonor] Failed to fetch donors:", error);
    return { success: false };
  }
}
