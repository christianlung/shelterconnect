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
  } catch (e) {
    console.log(e);

    throw new Error('[ShelterList] Failed to fetch shelters from database');
  }
}

/**
 * Action that fetches a single shelter from the database
 */
export async function getShelterById(
  id: string,
): Promise<ActionResult<Shelter>> {
  try {
    const shelter = await prisma.shelter.findUnique({
      where: { id },
    });
    if (!shelter) {
      return { success: false };
    }
    return { success: true, data: shelter };
  } catch {
    throw new Error('[ShelterList] Failed to fetch shelter from database');
  }
}
