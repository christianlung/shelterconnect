'use server';

import { prisma } from '@/lib/prisma';
import type { Donor } from '@prisma/client';
import type { ActionResult } from '@/types/models';

/**
 * Action that creates a new donor in the database
 */
export async function createDonor(donorName: string, finalDonorAmount: string): Promise<ActionResult<Donor>> {
  try {
    const newDonor = await prisma.donor.create({
      data: { donorName, finalDonorAmount },
    });

    return { success: true, data: newDonor };
  } catch (error) {
    console.error('[CreateDonor] Error:', error);
    return { success: false };
  }
}
