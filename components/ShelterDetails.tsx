'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shelter } from '@prisma/client';
import { useSession } from '@clerk/nextjs';
import { useState } from 'react';
import VolunteerSignupModal, {
  VolunteerSignUpFormData,
} from './VolunteerSignupModal';
import { addVolunteer, signupVolunteer } from '@/lib/actions/volunteer';
import { format } from 'date-fns';

export enum Role {
  EVACUEE = 'evacuee',
  VOLUNTEER = 'volunteer',
  COORDINATOR = 'coordinator',
}

export default function ShelterDetails({ shelter }: { shelter: Shelter }) {
  const router = useRouter();

  const { session } = useSession();
  const role: Role =
    (session?.user?.unsafeMetadata?.role as Role) || Role.EVACUEE;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suppliesNeeded = shelter.suppliesNeeded;
  const volunteerPreferences = shelter.volunteerPreferences;

  const handleSignupSubmit = async (formData: VolunteerSignUpFormData) => {
    console.log('Volunteer Signup Data:', {
      ...formData,
      formattedTimeSlot: `${format(formData.timeSlot[0], 'PPpp')} - ${format(formData.timeSlot[1], 'PPpp')}`,
    });

    const volunteer = await addVolunteer({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    });

    if (!volunteer.success) {
      console.error('Failed to add volunteer');
      return;
    }

    const result = await signupVolunteer({
      volunteerId: volunteer.data.id,
      shelterId: shelter.id,
      timeSlot: {
        start: new Date(formData.timeSlot[0]),
        end: new Date(formData.timeSlot[1]),
      },
    });

    if (!result.success) {
      console.error('Failed to signup volunteer');
      return;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{shelter?.name || 'Shelter Details'}</CardTitle>
        </CardHeader>
        <CardContent>
          {shelter ? (
            <div className="space-y-4">
              <p>
                <strong>Address:</strong> {shelter.address.street},{' '}
                {shelter.address.city}, {shelter.address.state}{' '}
                {shelter.address.zipCode}
              </p>

              {shelter.location && (
                <p>
                  <strong>Coordinates:</strong>{' '}
                  {shelter.location.coordinates[1]},{' '}
                  {shelter.location.coordinates[0]}
                </p>
              )}

              <p>
                <strong>Evacuee Capacity:</strong>{' '}
                {shelter.evacueeCapacity ?? 'N/A'}
              </p>

              {role !== Role.EVACUEE && (
                <p>
                  <strong>Volunteer Capacity:</strong>{' '}
                  {shelter.volunteerCapacity ?? 'N/A'}
                </p>
              )}

              {role !== Role.VOLUNTEER && (
                <p>
                  <strong>Accommodations:</strong>{' '}
                  {shelter.accommodations.length > 0
                    ? shelter.accommodations.join(', ')
                    : 'None'}
                </p>
              )}

              {role !== Role.VOLUNTEER && (
                <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <p>
                    🦽 Wheelchair Accessible:{' '}
                    {shelter.wheelchairAccessible ? 'Yes' : 'No'}
                  </p>
                  <p>
                    🧠 Counseling Unit:{' '}
                    {shelter.hasCounselingUnit ? 'Yes' : 'No'}
                  </p>
                  <p>
                    🐴 Large Animals:{' '}
                    {shelter.housesLargeAnimals ? 'Yes' : 'No'}
                  </p>
                  <p>
                    🐶 Small Animals:{' '}
                    {shelter.housesSmallAnimals ? 'Yes' : 'No'}
                  </p>
                  <p>🍲 Food Provided: {shelter.foodProvided ? 'Yes' : 'No'}</p>
                  <p>
                    💧 Water Provided: {shelter.waterProvided ? 'Yes' : 'No'}
                  </p>
                </div>
              )}

              <p>
                <strong>Required Languages:</strong>{' '}
                {shelter.requiredLanguages.length > 0
                  ? shelter.requiredLanguages.join(', ')
                  : 'None'}
              </p>

              {role !== Role.EVACUEE && (
                <div>
                  <strong>Volunteer Preferences:</strong>
                  {volunteerPreferences ? (
                    <ul className="list-disc pl-5">
                      <li>
                        <strong>Minimum Age:</strong>{' '}
                        {volunteerPreferences.minAge}
                      </li>
                      <li>
                        <strong>Required Training:</strong>{' '}
                        {volunteerPreferences.requiredTraining.length > 0
                          ? volunteerPreferences.requiredTraining.join(', ')
                          : 'None'}
                      </li>
                    </ul>
                  ) : (
                    <p>None</p>
                  )}
                </div>
              )}

              {role !== Role.EVACUEE && (
                <div>
                  <strong>Supplies Needed:</strong>
                  {suppliesNeeded.length > 0 ? (
                    <ul className="space-y-3 pl-5">
                      {suppliesNeeded.map((supply, index) => {
                        const percentageFilled =
                          supply.needed > 0
                            ? (supply.received / supply.needed) * 100
                            : 0;

                        return (
                          <li key={index} className="flex flex-col gap-1">
                            <span>
                              {supply.item}: {supply.received} / {supply.needed}
                            </span>
                            <Progress
                              value={percentageFilled}
                              className="h-2 w-64"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ' None'
                  )}
                </div>
              )}

              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 w-full"
              >
                Sign up as a volunteer!
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.back()}
                className="mt-4 w-full"
              >
                Back
              </Button>
            </div>
          ) : (
            <p>No shelter selected.</p>
          )}
        </CardContent>
      </Card>

      {/* Volunteer Signup Modal */}
      <VolunteerSignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSignupSubmit}
      />
    </div>
  );
}
