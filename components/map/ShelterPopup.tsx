import { FC, memo } from 'react';
import { Popup } from 'react-map-gl/mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareXmark,
  faCheck,
  faWheelchair,
} from '@fortawesome/free-solid-svg-icons';
import type { Shelter } from '@prisma/client';
import ShelterPopupAccommodationRow from './ShelterPopupAccommodationRow';

export interface ShelterPopupProps {
  shelter: Shelter;
  onClose: () => void;
  onSeeDetails: (shelterId: string) => void;
}

const ShelterPopup: FC<ShelterPopupProps> = memo(function ShelterPopup({
  shelter,
  onClose,
  onSeeDetails,
}) {
  if (!shelter.location) return null;

  return (
    <Popup
      longitude={shelter.location.coordinates[0]}
      latitude={shelter.location.coordinates[1]}
      closeButton={false}
      closeOnClick={false}
      anchor="bottom"
      offset={25}
    >
      <div className="relative p-3">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-1 text-gray-500 transition-colors hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faSquareXmark} className="h-5 w-5" />
        </button>
        <h3 className="pr-6 font-semibold text-gray-900">{shelter.name}</h3>
        <div className="mt-1 text-sm text-gray-600">
          <p>
            {shelter.address.city}, {shelter.address.state}
          </p>
          {shelter.evacueeCapacity && (
            <p>Capacity: {shelter.evacueeCapacity} evacuees</p>
          )}
          {shelter.foodProvided && (
            <ShelterPopupAccommodationRow icon={faCheck} text="Food provided" />
          )}
          {shelter.waterProvided && (
            <ShelterPopupAccommodationRow
              icon={faCheck}
              text="Water provided"
            />
          )}
          {shelter.wheelchairAccessible && (
            <ShelterPopupAccommodationRow
              icon={faWheelchair}
              text="Wheelchair accessible"
              iconColor="text-blue-500"
            />
          )}
        </div>
        <button
          onClick={() => onSeeDetails(shelter.id)}
          className="mt-3 w-full rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        >
          See Details
        </button>
      </div>
    </Popup>
  );
});

export default ShelterPopup;
