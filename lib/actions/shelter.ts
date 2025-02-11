'use server';
import { prisma } from '@/lib/prisma';
import type { Shelter } from '@prisma/client';
import type { ActionResult } from '@/types/models';

/**
 * Action that fetches all shelters from the database
 */
export async function getShelters(): Promise<ActionResult<Shelter[]>> {
  try {
    const shelters = await prisma.shelter.findMany();
    return { success: true, data: shelters };
  } catch {
    throw new Error('[ShelterList] Failed to fetch shelters from database');
  }
}
