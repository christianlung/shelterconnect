
import VolunteersJSON from '@/data/volunteers.json';
import SheltersJSON from '@/data/shelters.json';
import SignupsJSON from '@/data/volunteer_signups.json';
import {
  ShelterCreateInputSchema,
  VolunteerCreateInputSchema,
  VolunteerSignupCreateInputSchema,
} from '@/prisma/generated/zod';
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