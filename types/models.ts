import type { Interval } from 'date-fns';
import type { Volunteer, Shelter, VolunteerSignup } from '@prisma/client';

/** Result of an action that returns a value */
export type ActionResult<T> = { success: true; data: T } | { success: false };

/** Attributes for creating a new volunteer signup database entry */
export interface VolunteerSignupCreationAttributes
  extends Pick<VolunteerSignup, 'volunteerId' | 'shelterId'> {
  timeSlot: Interval;
}

/** Attributes for creating a new volunteer database entry */
export interface VolunteerCreationAttributes
  extends Pick<
    Volunteer,
    'name' | 'email' | 'phoneNumber' | 'languages' | 'canLiftHeavy'
  > {}

/** Attributes for creating a new shelter database entry */
export interface ShelterCreationAttributes
  extends Pick<
    Shelter,
    | 'name'
    | 'address'
    | 'location'
    | 'volunteerCapacity'
    | 'evacueeCapacity'
    | 'wheelchairAccessible'
    | 'housesLargeAnimals'
    | 'housesSmallAnimals'
    | 'foodProvided'
    | 'waterProvided'
    | 'requiredLanguages'
  > {}
