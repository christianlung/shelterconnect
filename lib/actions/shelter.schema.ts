import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import {
  EnumLanguageNullableListFilterSchema,
  BoolFilterSchema,
  SupplyObjectEqualityInputSchema,
  CoordinateObjectEqualityInputSchema,
  CoordinateNullableCompositeFilterSchema,
  StringFilterSchema,
  IntNullableFilterSchema,
  StringNullableListFilterSchema,
  JsonNullableFilterSchema,
  SupplyCompositeListFilterSchema,
} from '@/prisma/generated/zod';

export const GetSheltersParamsSchema: z.ZodType<Prisma.ShelterWhereInput> = z
  .object({
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    location: z
      .union([
        z.lazy(() => CoordinateNullableCompositeFilterSchema),
        z.lazy(() => CoordinateObjectEqualityInputSchema),
      ])
      .optional()
      .nullable(),
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
    volunteerPreferences: z.lazy(() => JsonNullableFilterSchema).optional(),
    suppliesNeeded: z
      .union([
        z.lazy(() => SupplyCompositeListFilterSchema),
        z.lazy(() => SupplyObjectEqualityInputSchema).array(),
      ])
      .optional(),
    requiredLanguages: z
      .lazy(() => EnumLanguageNullableListFilterSchema)
      .optional(),
  })
  .strict();

export type GetSheltersParams = z.infer<typeof GetSheltersParamsSchema>;
