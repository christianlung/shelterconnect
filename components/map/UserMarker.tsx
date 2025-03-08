import { FC, memo } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { LatLng } from '../Map';

export interface UserMarkerProps {
  location: LatLng;
}

const UserMarker: FC<UserMarkerProps> = memo(function UserMarker({ location }) {
  return (
    <Marker
      longitude={location.longitude}
      latitude={location.latitude}
      anchor="bottom"
    >
      <FontAwesomeIcon icon={faLocationDot} className="h-6 w-6 text-blue-500" />
    </Marker>
  );
});

export default UserMarker;
