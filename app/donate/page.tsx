import { unstable_cache } from 'next/cache';

import DonorList from '@/components/DonorList';
import Donation from '@/components/Donation';
import { prisma } from '@/lib/prisma';

const getDonors = unstable_cache(
  async () => {
    console.log("caching!") // Using console log to show when it has to make a db query for the first time. Will not show up for subsequent requests
    return await prisma.donor.findMany({
      orderBy: {
        finalDonorAmount: 'desc', 
      },
    });
  },
  ['donors'],
  { revalidate: 3600, tags: ['donors'] },
);

export default async function Page() {
  const donors = await getDonors();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 lg:py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
        Support Those in Need
      </h1>
      <div className="flex w-full flex-col justify-center gap-6 lg:flex-row lg:gap-10">
        <div className="flex w-full flex-col lg:w-3/5">
          <div className="mb-8 flex flex-col items-center">
            <p className="max-w-2xl text-center text-lg leading-relaxed text-gray-600">
              Every year, countless families lose their homes and belongings due
              to devastating wildfires, hurricanes, and other natural disasters.
              Your donation directly supports those in need by providing
              emergency shelter, food, medical aid, and essential supplies to
              help them rebuild their lives.
            </p>
          </div>
          <Donation />
        </div>
        <div className="w-full lg:w-2/5">
          <DonorList donors={donors} />
        </div>
      </div>
    </div>
  );
}
