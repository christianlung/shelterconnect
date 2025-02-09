'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, { ViewState, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapProps {
  /** Height of the map in the container. Defaults to 100% */
  height?: string | number;
}

export interface LatLng extends Pick<ViewState, 'longitude' | 'latitude'> {}

/**
 * Renders a map using ReactMapGL
 */
const Map: React.FunctionComponent<MapProps> = (props: MapProps) => {
  const { height } = props;
  const [viewState, setViewState] = useState<LatLng | null>(null);

  const [initialLocation, setInitialLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          setViewState(location);
          setInitialLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
  }, []);

  return (
    <div className={'w-full'} style={{ height: height || '100%' }}>
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
        {initialLocation && (
          <Marker
            longitude={initialLocation.longitude}
            latitude={initialLocation.latitude}
          />
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
