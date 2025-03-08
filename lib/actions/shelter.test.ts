import { prisma } from '@/lib/prisma';
import { getShelters, getShelterById } from '@/lib/actions/shelter';
import { shelterData } from '@/data';
import { ObjectId } from 'bson';

const originalFindMany = prisma.shelter.findMany;
const originalFindUnique = prisma.shelter.findUnique;

describe(getShelters, () => {
  beforeEach(async () => {
    prisma.shelter.findMany = originalFindMany;
    prisma.shelter.findUnique = originalFindUnique;
    await prisma.shelter.deleteMany();
  });

  afterAll(async () => {
    await prisma.volunteerSignup.deleteMany();
    await prisma.shelter.deleteMany();
    await prisma.$disconnect();
    prisma.shelter.findMany = originalFindMany;
    prisma.shelter.findUnique = originalFindUnique;
  });

  it('should return empty array when no shelters exist', async () => {
    await prisma.shelter.deleteMany();
    const result = await getShelters();

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(0);
  });

  it('should return all shelters from database', async () => {
    const newShelters = shelterData.slice(0, 2);
    await prisma.shelter.createMany({
      data: newShelters,
    });

    const result = await getShelters();

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(expect.arrayContaining(newShelters));
  });

  it('should throw error when database operation fails', async () => {
    const findManySpy = jest.spyOn(prisma.shelter, 'findMany');
    findManySpy.mockRejectedValueOnce(new Error('Database error'));

    await expect(getShelters()).rejects.toThrow(
      '[ShelterList] Failed to fetch shelters from database',
    );

    findManySpy.mockRestore();
  });
});

describe(getShelterById, () => {
  beforeEach(async () => {
    prisma.shelter.findMany = originalFindMany;
    prisma.shelter.findUnique = originalFindUnique;
    await prisma.shelter.deleteMany();
  });

  afterAll(async () => {
    await prisma.shelter.deleteMany();
    await prisma.$disconnect();
    prisma.shelter.findMany = originalFindMany;
    prisma.shelter.findUnique = originalFindUnique;
  });

  it('should return shelter when it exists', async () => {
    const shelter = await prisma.shelter.create({
      data: shelterData[3],
    });

    const result = await getShelterById(shelter.id);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toEqual(shelter);
  });

  it('should return failure when shelter does not exist', async () => {
    const nonExistentId = new ObjectId().toString();
    const result = await getShelterById(nonExistentId);

    expect(result).toEqual({ success: false });
  });

  it('should throw error when database operation fails', async () => {
    const findUniqueSpy = jest.spyOn(prisma.shelter, 'findUnique');
    findUniqueSpy.mockRejectedValueOnce(new Error('Database error'));

    const validId = new ObjectId().toString();
    await expect(getShelterById(validId)).rejects.toThrow(
      '[ShelterList] Failed to fetch shelter from database',
    );

    findUniqueSpy.mockRestore();
  });
});
