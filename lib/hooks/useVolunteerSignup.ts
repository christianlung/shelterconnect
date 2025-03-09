'use client';
import { useState, useEffect } from 'react';
import { signupVolunteer, getVolunteerDashboard } from '@/lib/actions/volunteer';
import type { VolunteerSignupCreationAttributes } from '@/types/models';
import { VolunteerSignupWithShelter } from '@/types/shelter';

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

export function useVolunteerDashboard() {
  const [data, setData] = useState<VolunteerSignupWithShelter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getVolunteerDashboard();
      if (result.success) {
        setData(result.data);
      } else {
        setError(new Error('Failed to load volunteer dashboard'));
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { data, loading, error, refetch: fetchDashboard };
}