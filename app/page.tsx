import PinnedBottomSheet from '@/components/PinnedBottomSheet';
import Map from '@/components/Map';
import ShelterList from '@/components/ShelterList';
import ClientOnly from '@/components/ClientOnly';

export default function Page() {
  return (
    <>
      <div className="absolute inset-0 z-0 h-dvh">
        <Map />
      </div>
      <ClientOnly>
        <PinnedBottomSheet className="bg-gray-100">
          <ShelterList />
        </PinnedBottomSheet>
      </ClientOnly>
    </>
  );
}
