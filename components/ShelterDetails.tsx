'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shelter } from '@prisma/client';

export default function ShelterDetails({ shelter }: { shelter: Shelter }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{shelter?.name || 'Shelter Details'}</CardTitle>
        </CardHeader>
        <CardContent>
          {shelter ? (
            <div className="space-y-4">
              {/* {shelter.picture && (
                <div className="relative h-64 w-full">
                  <Image
                    src={shelter.picture}
                    alt={shelter.name}
                    fill
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )} */}

              <p>
                <strong>Address:</strong> {shelter.address.street},{' '}
                {shelter.address.city}, {shelter.address.state}{' '}
                {shelter.address.zipCode}
              </p>

              {shelter.location && (
                <p>
                  <strong>Coordinates:</strong> {shelter.location.latitude},{' '}
                  {shelter.location.longitude}
                </p>
              )}

              <p>
                <strong>Evacuee Capacity:</strong>{' '}
                {shelter.evacueeCapacity ?? 'N/A'}
              </p>
              <p>
                <strong>Volunteer Capacity:</strong>{' '}
                {shelter.volunteerCapacity ?? 'N/A'}
              </p>
              <p>
                <strong>Accommodations:</strong>{' '}
                {shelter.accommodations.length > 0
                  ? shelter.accommodations.join(', ')
                  : 'None'}
              </p>

              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <p>
                  🦽 Wheelchair Accessible:{' '}
                  {shelter.wheelchairAccessible ? 'Yes' : 'No'}
                </p>
                <p>
                  🐴 Large Animals: {shelter.housesLargeAnimals ? 'Yes' : 'No'}
                </p>
                <p>
                  🐶 Small Animals: {shelter.housesSmallAnimals ? 'Yes' : 'No'}
                </p>
                <p>
                  🧠 Counseling Unit: {shelter.hasCounselingUnit ? 'Yes' : 'No'}
                </p>
                <p>🍲 Food Provided: {shelter.foodProvided ? 'Yes' : 'No'}</p>
                <p>💧 Water Provided: {shelter.waterProvided ? 'Yes' : 'No'}</p>
              </div>

              <p>
                <strong>Required Languages:</strong>{' '}
                {shelter.requiredLanguages.length > 0
                  ? shelter.requiredLanguages.join(', ')
                  : 'None'}
              </p>

              <Button onClick={() => router.back()} className="mt-4 w-full">
                Back
              </Button>
            </div>
          ) : (
            <p>No shelter selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
