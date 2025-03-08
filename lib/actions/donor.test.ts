import { prisma } from '../prisma';
import { createDonor, getDonor } from './donor';

const originalCreate = prisma.donor.create;
const originalFindMany = prisma.donor.findMany;

describe(createDonor, () => {
  beforeEach(async () => {
    prisma.donor.create = originalCreate;
    prisma.donor.findMany = originalFindMany;
    await prisma.donor.deleteMany();
  });

  afterAll(async () => {
    await prisma.donor.deleteMany();
    await prisma.$disconnect();
    prisma.donor.create = originalCreate;
    prisma.donor.findMany = originalFindMany;
  });

  it('should create a new donor successfully', async () => {
    const donorName = 'John Doe';
    const finalDonorAmount = '100';

    const result = await createDonor(donorName, finalDonorAmount);

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toBeDefined();
    expect(result.data!.donorName).toBe(donorName);
    expect(result.data!.finalDonorAmount).toBe(finalDonorAmount);

    const dbDonor = await prisma.donor.findFirst({
      where: { donorName, finalDonorAmount },
    });
    expect(dbDonor).toBeDefined();
    expect(dbDonor!.donorName).toBe(donorName);
    expect(dbDonor!.finalDonorAmount).toBe(finalDonorAmount);
  });

  it('should handle database errors when creating donor', async () => {
    const createSpy = jest.spyOn(prisma.donor, 'create');
    createSpy.mockRejectedValueOnce(new Error('Database error'));

    const result = await createDonor('John Doe', '100');

    expect(result).toEqual({ success: false });

    const dbDonors = await prisma.donor.findMany();
    expect(dbDonors).toHaveLength(0);

    createSpy.mockRestore();
  });
});

describe(getDonor, () => {
  beforeEach(async () => {
    prisma.donor.create = originalCreate;
    prisma.donor.findMany = originalFindMany;
    await prisma.donor.deleteMany();
  });

  afterAll(async () => {
    await prisma.donor.deleteMany();
    await prisma.$disconnect();
    prisma.donor.create = originalCreate;
    prisma.donor.findMany = originalFindMany;
  });

  it('should return empty array when no donors exist', async () => {
    const result = await getDonor();

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(0);
  });

  it('should return all donors from database', async () => {
    const donors = await Promise.all([
      prisma.donor.create({
        data: { donorName: 'John Doe', finalDonorAmount: '100' },
      }),
      prisma.donor.create({
        data: { donorName: 'Jane Smith', finalDonorAmount: '200' },
      }),
    ]);

    const result = await getDonor();

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(expect.arrayContaining(donors));
  });

  it('should handle database errors when fetching donors', async () => {
    const findManySpy = jest.spyOn(prisma.donor, 'findMany');
    findManySpy.mockRejectedValueOnce(new Error('Database error'));

    const result = await getDonor();

    expect(result).toEqual({ success: false });

    findManySpy.mockRestore();
  });
});
