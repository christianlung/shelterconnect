'use server';
import { prisma } from '@/lib/prisma';
import { validateTimeSlot } from '@/lib/utils/dates';
import type { SignupDetails } from '@/types/shelter';
import type {
  VolunteerSignupCreationAttributes,
  ActionResult,
} from '@/types/models';

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
