import { getShelters } from '@/lib/actions/shelter';
import { Shelter } from '@prisma/client';
import Link from 'next/link';

export default async function ShelterList() {
  const result = await getShelters();

  let shelters: Shelter[] = [];

  if (result.success) {
    shelters = result.data;
  }

  return (
    <div>
      <h1 className="mb-4 px-4 text-2xl font-bold text-gray-400">
        ShelterList functionality
      </h1>
      <div className="space-y-4 px-4">
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="rounded-lg border-2 border-gray-900 p-4 text-gray-600"
          >
            <Link href={`/shelters/${shelter.id}`}>
              <h2 className="text-xl font-semibold">{shelter.name}</h2>
              <p>{shelter.address.city}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
