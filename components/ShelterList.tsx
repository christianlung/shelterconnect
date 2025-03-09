import { Shelter } from '@prisma/client';
import Link from 'next/link';
import { unstable_cache } from 'next/cache'
import { prisma } from "@/lib/prisma"

const getShelters = unstable_cache(
  async () => {
    // console.log("caching!") // Using console log to show when it has to make a db query for the first time. Will not show up for subsequent requests
    return await prisma.shelter.findMany()
  },
  ['shelters'],
  { revalidate: 3600, tags: ['shelters'] }
)

export default async function ShelterList() {
  const shelters = await getShelters();

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
