/**
 * Script used to seed the database with fake data from JSON files.
 */

import { PrismaClient } from '@prisma/client';
import { volunteerData, shelterData, signupData } from '@/data';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');

    await prisma.$transaction(async (tx) => {
      console.log('Clearing existing data...');
      await tx.volunteerSignup.deleteMany();
      await tx.volunteer.deleteMany();
      await tx.shelter.deleteMany();

      console.log('Creating volunteers...');
      await tx.volunteer.createMany({
        data: volunteerData,
      });

      console.log('Creating shelters...');
      await tx.shelter.createMany({
        data: shelterData,
      });

      console.log('Creating volunteer signups...');
      for (const signup of signupData) {
        await tx.volunteerSignup.create({
          data: signup,
        });
      }
    });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
