'use server';
import { prisma } from '@/lib/prisma';
import { validateTimeSlot } from '@/lib/utils/dates';
import type {
  SignupDetails,
  VolunteerSignupWithShelter,
} from '@/types/shelter';
import type {
  VolunteerSignupCreationAttributes,
  ActionResult,
} from '@/types/models';
import { Prisma, Volunteer } from '@prisma/client';

export async function addVolunteer(
  volunteer: Prisma.VolunteerCreateInput,
): Promise<ActionResult<Volunteer>> {
  try {
    console.log('Adding new volunteer...');
    const newVolunteer = await prisma.volunteer.create({
      data: volunteer,
    });
    console.log('Inserted volunteer:', newVolunteer);
    return { success: true, data: newVolunteer };
  } catch (error) {
    console.error('Error inserting volunteer:', error);
    return {
      success: false,
    };
  }
}

/**
 * Action that creates a new volunteer signup
 */
export async function signupVolunteer({
  volunteerId,
  shelterId,
  timeSlot,
}: VolunteerSignupCreationAttributes): Promise<ActionResult<SignupDetails>> {
  if (!volunteerId || !shelterId) {
    throw new Error(
      '[VolunteerSignup] Volunteer ID and Shelter ID are required',
    );
  }

  if (!validateTimeSlot(timeSlot)) {
    throw new Error('[VolunteerSignup] Invalid time slot');
  }

  try {
    const signup = await prisma.volunteerSignup.create({
      data: {
        volunteerId,
        shelterId,
        timeSlot: {
          start: new Date(timeSlot.start),
          end: new Date(timeSlot.end),
        },
        status: 'pending',
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

    return { success: true, data: { ...signup } };
  } catch {
    throw new Error('[VolunteerSignup] Database operation failed');
  }
}

export async function getVolunteerDashboard(): Promise<
  ActionResult<VolunteerSignupWithShelter[]>
> {
  try {
    const volunteerSignups = await prisma.volunteerSignup.findMany({
      include: {
        shelter: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });

    return { success: true, data: volunteerSignups };
  } catch {
    throw new Error('[VolunteerSignup] Database operation failed');
  }
}
