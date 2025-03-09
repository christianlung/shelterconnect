'use server';
import { prisma } from '@/lib/prisma';
import type { Prisma, Shelter } from '@prisma/client';
import type { ActionResult } from '@/types/models';
import { unstable_cache } from 'next/cache';
import { GetSheltersParams } from './shelter.schema';

/**
 * Action that fetches all shelters from the database
 */
export const getShelters = unstable_cache(
  async (params: GetSheltersParams = {}): Promise<ActionResult<Shelter[]>> => {
    try {
      const shelters = await prisma.shelter.findMany({
        where: params,
      });
      return { success: true, data: shelters };
    } catch (e) {
      console.log(e);

      throw new Error('[ShelterList] Failed to fetch shelters from database');
    }
  },
  ['shelters'],
  { revalidate: 3600, tags: ['shelters'] },
);

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

/**
 * Action that deletes a shelter from the database
 */
export async function deleteShelter(shelterId: string) {
  try {
    console.log('Deleting dependent volunteerSignups');
    await prisma.volunteerSignup.deleteMany({
      where: { shelterId },
    });

    console.log('Deleting the shelter');
    await prisma.shelter.delete({
      where: { id: shelterId },
    });

    return { success: true, message: 'Shelter deleted successfully' };
  } catch (error) {
    console.error('Error deleting shelter:', error);
    return { success: false, message: 'Failed to delete shelter', error };
  }
}

export async function addShelter(
  shelter: Prisma.ShelterCreateInput,
): Promise<ActionResult<Shelter>> {
  try {
    console.log('Adding new shelter...');
    const newShelter = await prisma.shelter.create({
      data: shelter,
    });
    console.log('Inserted shelter:', newShelter);
    return { success: true, data: newShelter };
  } catch (error) {
    console.error('Error inserting shelter:', error);
    return { success: false };
  }
}

export async function updateShelter(
  shelterId: string,
  updatedData: Prisma.ShelterUpdateInput,
): Promise<ActionResult<Shelter>> {
  try {
    const shelter = await prisma.shelter.update({
      where: { id: shelterId },
      data: updatedData,
    });
    return { success: true, data: shelter };
  } catch {
    return { success: false };
  }
}
