/**
 * Script used to seed the database with fake data from JSON files.
 */

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import VolunteersJSON from '@/data/volunteers.json';
import SheltersJSON from '@/data/shelters.json';
import SignupsJSON from '@/data/volunteer_signups.json';
import {
  ShelterCreateInputSchema,
  VolunteerCreateInputSchema,
  VolunteerSignupCreateInputSchema,
} from '@/prisma/generated/zod';

const prisma = new PrismaClient();

const VolunteerSchema = z.object({
  volunteers: VolunteerCreateInputSchema.array(),
});

const ShelterSchema = z.object({
  shelters: ShelterCreateInputSchema.array(),
});

const SignupSchema = z.object({
  volunteer_signups: VolunteerSignupCreateInputSchema.array(),
});

const volunteers = VolunteerSchema.parse(VolunteersJSON).volunteers;
const shelters = ShelterSchema.parse(SheltersJSON).shelters;
const signups = SignupSchema.parse(SignupsJSON).volunteer_signups;

async function main() {
  try {
    console.log('Clearing existing data...');
    await prisma.volunteerSignup.deleteMany();
    await prisma.volunteer.deleteMany();
    await prisma.shelter.deleteMany();

    console.log('Creating volunteers...');
    for (const volunteer of volunteers) {
      await prisma.volunteer.create({
        data: volunteer,
      });
    }

    console.log('Creating shelters...');
    for (const shelter of shelters) {
      await prisma.shelter.create({
        data: shelter,
      });
    }

    console.log('Creating volunteer signups...');
    for (const signup of signups) {
      await prisma.volunteerSignup.create({
        data: signup,
      });
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
