import { prisma } from '@/lib/prisma';
import { signupVolunteer } from '@/lib/actions/volunteer';
import { shelterData, volunteerData } from '@/data';
import { addDays } from 'date-fns';

const originalCreate = prisma.volunteerSignup.create;

describe(signupVolunteer, () => {
  beforeEach(async () => {
    prisma.volunteerSignup.create = originalCreate;
    await prisma.volunteerSignup.deleteMany();
    await prisma.volunteer.deleteMany();
    await prisma.shelter.deleteMany();
  });

  afterAll(async () => {
    await prisma.volunteerSignup.deleteMany();
    await prisma.volunteer.deleteMany();
    await prisma.shelter.deleteMany();
    await prisma.$disconnect();
    prisma.volunteerSignup.create = originalCreate;
  });

  it('should create a volunteer signup successfully', async () => {
    const volunteer = await prisma.volunteer.create({
      data: volunteerData[0],
    });
    const shelter = await prisma.shelter.create({
      data: shelterData[0],
    });

    const timeSlot = {
      start: new Date(),
      end: addDays(new Date(), 1),
    };

    const result = await signupVolunteer({
      volunteerId: volunteer.id,
      shelterId: shelter.id,
      timeSlot,
    });

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data.volunteer).toEqual({
      name: volunteer.name,
      email: volunteer.email,
      phoneNumber: volunteer.phoneNumber,
    });
    expect(result.data.shelter).toEqual({
      name: shelter.name,
      address: shelter.address,
    });
    expect(result.data.status).toBe('pending');
    expect(result.data.timeSlot).toEqual(timeSlot);

    const dbSignup = await prisma.volunteerSignup.findFirst({
      where: {
        volunteerId: volunteer.id,
        shelterId: shelter.id,
      },
      include: {
        volunteer: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
        shelter: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });
    expect(dbSignup).toBeDefined();
    expect(dbSignup!.status).toBe('pending');
  });

  it('should throw error when volunteer ID is missing', async () => {
    const shelter = await prisma.shelter.create({
      data: shelterData[0],
    });

    await expect(
      signupVolunteer({
        volunteerId: '',
        shelterId: shelter.id,
        timeSlot: {
          start: new Date(),
          end: addDays(new Date(), 1),
        },
      }),
    ).rejects.toThrow(
      '[VolunteerSignup] Volunteer ID and Shelter ID are required',
    );
  });

  it('should throw error when shelter ID is missing', async () => {
    const volunteer = await prisma.volunteer.create({
      data: volunteerData[0],
    });

    await expect(
      signupVolunteer({
        volunteerId: volunteer.id,
        shelterId: '',
        timeSlot: {
          start: new Date(),
          end: addDays(new Date(), 1),
        },
      }),
    ).rejects.toThrow(
      '[VolunteerSignup] Volunteer ID and Shelter ID are required',
    );
  });

  it('should throw error when time slot is invalid', async () => {
    const volunteer = await prisma.volunteer.create({
        data: volunteerData[0],
    });
    const shelter = await prisma.shelter.create({
      data: shelterData[0],
    });

    const invalidTimeSlot = {
      start: addDays(new Date(), 1),
      end: new Date(),
    };

    await expect(
      signupVolunteer({
        volunteerId: volunteer.id,
        shelterId: shelter.id,
        timeSlot: invalidTimeSlot,
      }),
    ).rejects.toThrow('[VolunteerSignup] Invalid time slot');
  });

  it('should throw error when database operation fails', async () => {
    const volunteer = await prisma.volunteer.create({
      data: volunteerData[0],
    });
    const shelter = await prisma.shelter.create({
      data: shelterData[0],
    });

    const createSpy = jest.spyOn(prisma.volunteerSignup, 'create');
    createSpy.mockRejectedValueOnce(new Error('Database error'));

    await expect(
      signupVolunteer({
        volunteerId: volunteer.id,
        shelterId: shelter.id,
        timeSlot: {
          start: new Date(),
          end: addDays(new Date(), 1),
        },
      }),
    ).rejects.toThrow('[VolunteerSignup] Database operation failed');

    createSpy.mockRestore();
  });
});
