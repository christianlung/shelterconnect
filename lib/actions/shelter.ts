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

/**
 * Action that deletes a shelter from the database
 */
export async function deleteShelter(shelterId: string) {
  try {
    console.log("Deleting dependent volunteerSignups");
    await prisma.volunteerSignup.deleteMany({
      where: { shelterId }
    });


    console.log("Deleting the shelter");
    await prisma.shelter.delete({
      where: { id: shelterId }
    });

    return { success: true, message: "Shelter deleted successfully" };

  } catch (error) {
    console.error("Error deleting shelter:", error);
    return { success: false, message: "Failed to delete shelter", error };
  }
}

export async function addShelter(shelter: any): Promise<ActionResult<Shelter>> {
  try {
    console.log("Adding new shelter...");
    const newShelter = await prisma.shelter.create({
      data: {
        ...shelter,
        location: shelter.location ? { set: shelter.location } : undefined,
        address: { set: shelter.address },
        accommodations: shelter.accommodations || [],
        suppliesNeeded: shelter.suppliesNeeded || [],
        requiredLanguages: shelter.requiredLanguages || [],
      },
    });
    console.log("Inserted shelter:", newShelter);
    return { success: true, data: newShelter };;
  } catch (error) {
    console.error("Error inserting shelter:", error);
    return { success: false };
  }
}

export async function updateShelter(shelterId: string, updatedData: Partial<Shelter>): Promise<ActionResult<Shelter>> {
  try {
    const shelter = await prisma.shelter.update({
      where: { id: shelterId },
      data: updatedData,
    });
    return { success: true, data: shelter};
  } catch (error){
    return { success: false };
  }
}