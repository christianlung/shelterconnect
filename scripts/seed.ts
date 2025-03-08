/**
 * Script used to seed the database with fake data from JSON files.
 */

import { PrismaClient } from '@prisma/client';
import { volunteerData, shelterData, signupData } from '@/data';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Clearing existing data...');
    await prisma.volunteerSignup.deleteMany();
    await prisma.volunteer.deleteMany();
    await prisma.shelter.deleteMany();

    console.log('Creating volunteers...');
    for (const volunteer of volunteerData) {
      await prisma.volunteer.create({
        data: volunteer,
      });
    }

    console.log('Creating shelters...');
    for (const shelter of shelterData) {
      await prisma.shelter.create({
        data: shelter,
      });
    }

    console.log('Creating volunteer signups...');
    for (const signup of signupData) {
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
