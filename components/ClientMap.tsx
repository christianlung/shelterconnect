'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, { ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProps, LatLng } from './Map';
import { useRouter } from 'next/navigation';
import UserMarker from './map/UserMarker';
import ShelterMarker from './map/ShelterMarker';
import ShelterPopup from './map/ShelterPopup';
import { useShelterStore } from '@/lib/store/shelterStore';

interface ClientMapProps extends MapProps {
  /**
   * Coordinates to initially center the map on. If null, map will center on
   * an arbitrary location.
   */
  initialCoordinates: LatLng | null;
}

export default function ClientMap(props: ClientMapProps) {
  const { height, initialCoordinates } = props;
  const { shelters } = useShelterStore();
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState | null>({
    ...initialCoordinates,
    zoom: 14,
  } as ViewState);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            zoom: 14,
          };
          setViewState(location as ViewState);
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
  }, [initialCoordinates]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!viewState) return;
    const zoomChange = direction === 'in' ? 1 : -1;
    setViewState({
      ...viewState,
      zoom: Math.max(0, Math.min(20, (viewState.zoom || 14) + zoomChange)),
    });
  };

  const handleShelterClick = (shelterId: string) => {
    setSelectedShelterId(shelterId === selectedShelterId ? null : shelterId);
  };

  const navigateToShelter = (shelterId: string) => {
    router.push(`/shelters/${shelterId}`);
  };

  const selectedShelter = shelters.find((s) => s.id === selectedShelterId);

  return (
    <div className="relative w-full" style={{ height: height || '100%' }}>
      <ReactMapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        {...viewState}
        initialViewState={{
          zoom: 14,
        }}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {userLocation && <UserMarker location={userLocation} />}

        {shelters.map((shelter) => (
          <ShelterMarker
            key={shelter.id}
            shelter={shelter}
            onClick={handleShelterClick}
          />
        ))}

        {selectedShelter && (
          <ShelterPopup
            shelter={selectedShelter}
            onClose={() => setSelectedShelterId(null)}
            onSeeDetails={navigateToShelter}
          />
        )}
      </ReactMapGL>

      <div className="absolute right-4 top-24 hidden flex-col gap-2 md:flex">
        <button
          onClick={() => handleZoom('in')}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
          aria-label="Zoom out"
        >
          -
        </button>
      </div>
    </div>
  );
}
