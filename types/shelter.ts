import type { Shelter, Volunteer, VolunteerSignup, Address } from '@prisma/client';
import type { Interval } from 'date-fns';

export interface VolunteerDetails
  extends Pick<Volunteer, 'name' | 'email' | 'phoneNumber'> {}

export interface ShelterDetails extends Pick<Shelter, 'name' | 'address'> {}

/** Details returned when a volunteer signs up for a timeslot */
export interface SignupDetails extends Pick<VolunteerSignup, 'status'> {
  volunteer: VolunteerDetails;
  shelter: ShelterDetails;
  timeSlot: Interval;
}

export interface Supply {
  item: string;
  received: number;
  needed: number;
}

export interface VolunteerPreferences {
  minAge: number;
  requiredTraining: string[];
}

export interface VolunteerSignupWithShelter extends Pick<
VolunteerSignup, 
'id' | 'shelterId' | 'volunteerId' | 'timeSlot' | 'tasks' | 'createdAt' | 'updatedAt' | 'status'
> {
  shelter:{
    name: string;
    address: Address;
  };
}