import ShelterDetails from '@/components/ShelterDetails';
import { getShelterById } from '@/lib/actions/shelter';
import { notFound } from 'next/navigation';

const ShelterDetailsPage = async ({
  params,
}: {
  params: { shelterId: string };
}) => {
  const { shelterId } = await params;

  const result = await getShelterById(shelterId);

  if (!result.success) {
    notFound();
  }

  const shelter = result.data;

  return <ShelterDetails shelter={shelter} role="admin" />;
};

export default ShelterDetailsPage;
