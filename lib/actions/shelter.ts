'use server';
import { prisma } from '@/lib/prisma';
import type { Prisma, Shelter } from '@prisma/client';
import type { ActionResult } from '@/types/models';
import { unstable_cache } from 'next/cache';
import type {
  GetSheltersParams,
  Coordinates,
  PaginationParams,
} from './shelter.schema';

// MongoDB's representation of the shelter object with _id object
type RawShelter = Shelter & {
  _id?: { $oid: string }; // Add _id from MongoDB
};

interface GeoNearResult {
  cursor: {
    firstBatch: Array<RawShelter & { distance: number }>;
  };
  ok: number;
}

interface GeoNearStage {
  $geoNear: {
    near: {
      type: 'Point';
      coordinates: [number, number];
    };
    distanceField: string;
    spherical: boolean;
    query: Prisma.ShelterWhereInput;
  };
}

interface SkipStage {
  $skip: number;
}

interface LimitStage {
  $limit: number;
}

type AggregationStage = GeoNearStage | SkipStage | LimitStage;

interface GetSheltersResult {
  shelters: Shelter[];
  total: number;
}

/**
 * Action that fetches all shelters from the database with optional geospatial sorting and pagination
 */
export const getShelters = unstable_cache(
  async (
    params: GetSheltersParams = {},
  ): Promise<ActionResult<GetSheltersResult>> => {
    try {
      const { coordinates, pagination, ...whereParams } = params as {
        coordinates?: Coordinates;
        pagination?: PaginationParams;
        [key: string]: unknown;
      };

      if (isValidCoordinates(coordinates)) {
        // Use MongoDB's $geoNear for geospatial queries
        const pipeline: AggregationStage[] = [
          {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [coordinates.longitude, coordinates.latitude],
              },
              distanceField: 'distance',
              spherical: true,
              query: whereParams,
            },
          },
        ];

        // Get total count before applying pagination
        const totalCount = await prisma.shelter.count({
          where: whereParams as Prisma.ShelterWhereInput,
        });

        if (isValidPagination(pagination)) {
          const skip = (pagination.page - 1) * pagination.limit;
          pipeline.push({ $skip: skip }, { $limit: pagination.limit });
        }

        const rawShelters = (await prisma.$runCommandRaw({
          aggregate: 'Shelter',
          pipeline: pipeline as unknown as Prisma.InputJsonValue[],
          cursor: {},
        })) as unknown as GeoNearResult;

        if (!rawShelters?.cursor?.firstBatch) {
          return { success: true, data: { shelters: [], total: 0 } };
        }

        // Normalize `_id` to `id`
        const shelters = rawShelters.cursor.firstBatch.map((shelter) => ({
          ...shelter,
          id: shelter._id?.$oid || 'MISSING_ID',
        }));

        return {
          success: true,
          data: {
            shelters: shelters,
            total: totalCount,
          },
        };
      }

      // If no coordinates provided, use regular findMany with pagination
      const totalCount = await prisma.shelter.count({
        where: whereParams as Prisma.ShelterWhereInput,
      });

      const paginationOptions = isValidPagination(pagination)
        ? {
            skip: (pagination.page - 1) * pagination.limit,
            take: pagination.limit,
          }
        : undefined;

      const shelters = await prisma.shelter.findMany({
        where: whereParams as Prisma.ShelterWhereInput,
        ...paginationOptions,
      });

      return {
        success: true,
        data: {
          shelters,
          total: totalCount,
        },
      };
    } catch (e) {
      console.error('[ShelterList] Error:', e);
      throw new Error('[ShelterList] Failed to fetch shelters from database');
    }
  },
  ['shelters'],
  { revalidate: 3600, tags: ['shelters'] },
);

function isValidCoordinates(
  coords: Coordinates | undefined,
): coords is Coordinates {
  return (
    coords !== undefined &&
    typeof coords.longitude === 'number' &&
    typeof coords.latitude === 'number'
  );
}

function isValidPagination(
  pagination: PaginationParams | undefined,
): pagination is PaginationParams {
  return (
    pagination !== undefined &&
    typeof pagination.page === 'number' &&
    typeof pagination.limit === 'number'
  );
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
