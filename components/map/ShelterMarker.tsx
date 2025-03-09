import { FC, memo } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import type { Shelter } from '@prisma/client';

export interface ShelterMarkerProps {
  shelter: Shelter;
  onClick: (shelterId: string) => void;
}

const ShelterMarker: FC<ShelterMarkerProps> = memo(function ShelterMarker({
  shelter,
  onClick,
}) {
  if (!shelter.location) return null;

  return (
    <Marker
      longitude={shelter.location.coordinates[0]}
      latitude={shelter.location.coordinates[1]}
      anchor="bottom"
    >
      <div onClick={() => onClick(shelter.id)} className="cursor-pointer">
        <FontAwesomeIcon
          icon={faHouse}
          className="h-6 w-6 text-red-500 transition-colors hover:text-red-600"
        />
      </div>
    </Marker>
  );
});

export default ShelterMarker;
