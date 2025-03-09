import ShelterDetails from '@/components/ShelterDetails';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache'
import { prisma } from "@/lib/prisma"

const _getShelterById = unstable_cache(
  async (id: string) => {
    console.log("Fetching shelter from DB...") // This logs only when DB is queried
    return await prisma.shelter.findUnique({
      where: { id },
    })
  },
  ['shelter'],
  { revalidate: 3600, tags: ['shelters'] }
)

// Wrapper function to cache per ID
const getShelterById = async (id: string) => {
  return await _getShelterById(id)
}

const ShelterDetailsPage = async ({
  params,
}: {
  params: { shelterId: string };
}) => {
  const { shelterId } = params;

  const shelter = await getShelterById(shelterId);

  if (!shelter) {
    notFound();
  }

  return <ShelterDetails shelter={shelter} />;
};

export default ShelterDetailsPage;
