'use client';
import { signupVolunteer } from '@/lib/actions/volunteer';
import type { VolunteerSignupCreationAttributes } from '@/types/models';

import { SignupDetails } from '@/types/shelter';

/**
 * Hook that returns a callback for signing up a volunteer for a timeslot.
 * Returns null if the signup fails and the details if successful.
 */
export function useVolunteerSignup() {
  return async (
    params: VolunteerSignupCreationAttributes,
  ): Promise<SignupDetails | null> => {
    const result = await signupVolunteer(params);
    if (!result.success) {
      console.error('[VolunteerSignup] Failed to sign up for shelter');
      return null;
    }
    return result.data;
  };
}
