import type { Interval } from 'date-fns';
import type { VolunteerSignup } from '@prisma/client';

/** Result of an action that returns a value */
export type ActionResult<T> = { success: true; data: T } | { success: false };

/** Attributes for creating a new volunteer signup database entry */
export interface VolunteerSignupCreationAttributes
  extends Pick<VolunteerSignup, 'volunteerId' | 'shelterId'> {
  timeSlot: Interval;
}
