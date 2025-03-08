'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, { ViewState, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProps, LatLng } from './Map';
import type { Shelter } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { faLocationPin, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ClientMapProps extends MapProps {
  /**
   * Coordinates to initially center the map on. If null, map will center on
   * an arbitrary location.
   */
  initialCoordinates: LatLng | null;
  /**
   * List of shelters to display on the map
   */
  shelters: Shelter[];
}

export default function ClientMap(props: ClientMapProps) {
  const { height, initialCoordinates, shelters } = props;
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState | null>({
    ...initialCoordinates,
    zoom: 14,
  } as ViewState);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [hoveredShelterId, setHoveredShelterId] = useState<string | null>(null);

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
    router.push(`/shelters/${shelterId}`);
  };

  return (
    <div className="relative w-full pt-20" style={{ height: height || '100%' }}>
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
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <FontAwesomeIcon
              icon={faHouseUser}
              className="h-6 w-6 text-blue-500"
            />
          </Marker>
        )}
        {shelters.map(
          (shelter) =>
            shelter.location && (
              <React.Fragment key={shelter.id}>
                <Marker
                  longitude={shelter.location.longitude}
                  latitude={shelter.location.latitude}
                  anchor="bottom"
                >
                  <div
                    onMouseEnter={() => setHoveredShelterId(shelter.id)}
                    onMouseLeave={() => setHoveredShelterId(null)}
                    onClick={() => handleShelterClick(shelter.id)}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="h-6 w-6 text-red-500 transition-colors hover:text-red-600"
                    />
                  </div>
                </Marker>
                {hoveredShelterId === shelter.id && (
                  <Popup
                    longitude={shelter.location.longitude}
                    latitude={shelter.location.latitude}
                    closeButton={false}
                    closeOnClick={false}
                    anchor="bottom"
                    offset={25}
                  >
                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900">
                        {shelter.name}
                      </h3>
                      <div className="mt-1 text-sm text-gray-600">
                        <p>
                          {shelter.address.city}, {shelter.address.state}
                        </p>
                        {shelter.evacueeCapacity && (
                          <p>Capacity: {shelter.evacueeCapacity} evacuees</p>
                        )}
                        {shelter.foodProvided && <p>✓ Food provided</p>}
                        {shelter.waterProvided && <p>✓ Water provided</p>}
                        {shelter.wheelchairAccessible && (
                          <p>♿ Wheelchair accessible</p>
                        )}
                      </div>
                    </div>
                  </Popup>
                )}
              </React.Fragment>
            ),
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
