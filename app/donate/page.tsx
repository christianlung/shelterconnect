import { unstable_cache } from 'next/cache';

import DonorList from '@/components/DonorList';
import Donation from '@/components/Donation';
import { prisma } from '@/lib/prisma';

const getDonors = unstable_cache(
  async () => {
    // console.log("caching!") // Using console log to show when it has to make a db query for the first time. Will not show up for subsequent requests
    return await prisma.donor.findMany();
  },
  ['donors'],
  { revalidate: 3600, tags: ['donors'] },
);

export default async function Page() {
  const donors = await getDonors();

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-4 md:flex-row md:gap-10 md:p-6">
      <div className="flex w-full flex-col md:w-2/3">
        <div className="flex flex-col items-center">
          <p className="mb-6 max-w-4xl text-center text-lg leading-relaxed text-gray-700 md:text-xl">
            Every year, countless families lose their homes and belongings due
            to devastating wildfires, hurricanes, and other natural disasters.
            Your donation directly supports those in need by providing emergency
            shelter, food, medical aid, and essential supplies to help them
            rebuild their lives. Even a small contribution can make a
            significant difference in bringing hope and relief to disaster
            victims. Choose an amount below to donate and stand with those
            affected.
          </p>
        </div>
        <Donation />
      </div>
      <div className="mt-6 w-full md:mt-3 md:w-1/3">
        <DonorList donors={donors} />
      </div>
    </div>
  );
}
