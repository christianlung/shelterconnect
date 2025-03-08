import { unstable_cache } from 'next/cache'

import DonorList from "@/components/DonorList";
import { getDonor } from "@/lib/actions/donor";
import Donation from "@/components/Donation"
import { prisma } from "@/lib/prisma"

const getDonors = unstable_cache(
  async () => {
    // console.log("caching!") // Using console log to show when it has to make a db query for the first time. Will not show up for subsequent requests
    return await prisma.donor.findMany()
  },
  ['donors'],
  { revalidate: 3600, tags: ['donors'] }
)

export default async function Page() {
  const donors = await getDonors();

  return (
    <div className="flex flex-row justify-center gap-10 w-full p-6">
      <div className="w-2/3 flex flex-col">
        <div className="flex flex-col items-center">
          <p className="text-center text-gray-700 max-w-4xl mb-6 text-xl leading-relaxed">
            Every year, countless families lose their homes and belongings due to devastating wildfires, hurricanes, and other natural disasters. 
            Your donation directly supports those in need by providing emergency shelter, food, medical aid, and essential supplies to help them rebuild their lives. 
            Even a small contribution can make a significant difference in bringing hope and relief to disaster victims. 
            Choose an amount below to donate and stand with those affected.
          </p>
        </div>
        <Donation />
      </div>
      <div className="w-1/3 mt-3 items-end">
        <DonorList donors={donors} />
      </div>
    </div>
  );
}
