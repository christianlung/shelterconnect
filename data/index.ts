
import VolunteersJSON from '@/data/volunteers.json';
import SheltersJSON from '@/data/shelters.json';
import SignupsJSON from '@/data/volunteer_signups.json';
import {
  ShelterCreateInputSchema,
  VolunteerCreateInputSchema,
  VolunteerSignupCreateInputSchema,
} from '@/prisma/generated/zod';
import { Prisma } from '@prisma/client';
import { z } from 'zod';



const VolunteerSchema = z.object({
    volunteers: VolunteerCreateInputSchema.array().nonempty(),
  });
  
  const ShelterSchema = z.object({
    shelters: ShelterCreateInputSchema.array().nonempty(),
  });
  
  const SignupSchema = z.object({
    volunteer_signups: VolunteerSignupCreateInputSchema.array().nonempty(),
  });

export const volunteerData = VolunteerSchema.parse(VolunteersJSON).volunteers;
export const shelterData = ShelterSchema.parse(SheltersJSON).shelters;
export const signupData = SignupSchema.parse(SignupsJSON).volunteer_signups;

export const shelterDataWithoutIds: Exclude<Prisma.ShelterCreateInput, 'id'>[] = shelterData.map((shelter) => {
  return {
    ...shelter,
    id: undefined,
  };
});

export const volunteerDataWithoutIds: Exclude<Prisma.VolunteerCreateInput, 'id'>[] = volunteerData.map((volunteer) => {
  return {
    ...volunteer,
    id: undefined,
  };
});