import { z } from 'zod';
import {
  EnumLanguageNullableListFilterSchema,
  BoolFilterSchema,
  SupplyObjectEqualityInputSchema,
  StringFilterSchema,
  IntNullableFilterSchema,
  StringNullableListFilterSchema,
  SupplyCompositeListFilterSchema,
  VolunteerPreferencesObjectEqualityInputSchema,
  VolunteerPreferencesNullableCompositeFilterSchema,
} from '@/prisma/generated/zod';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export const CoordinatesSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});

export const PaginationParamsSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
});

export const GetSheltersParamsSchema = z
  .object({
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    volunteerCapacity: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    evacueeCapacity: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    accommodations: z.lazy(() => StringNullableListFilterSchema).optional(),
    wheelchairAccessible: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    housesLargeAnimals: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    housesSmallAnimals: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    hasCounselingUnit: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    foodProvided: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    waterProvided: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    volunteerPreferences: z
      .union([
        z.lazy(() => VolunteerPreferencesNullableCompositeFilterSchema),
        z.lazy(() => VolunteerPreferencesObjectEqualityInputSchema),
      ])
      .optional()
      .nullable(),
    suppliesNeeded: z
      .union([
        z.lazy(() => SupplyCompositeListFilterSchema),
        z.lazy(() => SupplyObjectEqualityInputSchema).array(),
      ])
      .optional(),
    requiredLanguages: z
      .lazy(() => EnumLanguageNullableListFilterSchema)
      .optional(),
    coordinates: CoordinatesSchema.optional(),
    pagination: PaginationParamsSchema.optional(),
  })
  .strict();

export type GetSheltersParams = z.infer<typeof GetSheltersParamsSchema>;
