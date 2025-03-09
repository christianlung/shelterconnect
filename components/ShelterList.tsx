import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import ShelterQuickInfo from './ShelterQuickInfo';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

const getShelters = unstable_cache(
  async () => {
    // console.log("caching!") // Using console log to show when it has to make a db query for the first time. Will not show up for subsequent requests
    return await prisma.shelter.findMany();
  },
  ['shelters'],
  { revalidate: 3600, tags: ['shelters'] },
);

export default async function ShelterList() {
  const shelters = await getShelters();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <FontAwesomeIcon
              icon={faHouseChimney}
              className="h-6 w-6 text-primary-500"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Available Shelters
          </h1>
        </div>
        <span className="text-sm text-gray-500">{shelters.length} total</span>
      </div>

      {shelters.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shelters.map((shelter) => (
            <ShelterQuickInfo key={shelter.id} shelter={shelter} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-gray-600">No shelters available at the moment.</p>
        </div>
      )}
    </div>
  );
}
