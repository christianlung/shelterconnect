'use client';
import * as React from 'react';
import ReactMapGL from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapProps {
  /** Height of the map in the container. Defaults to 100% */
  height?: string | number;
}

/**
 * Renders a map using ReactMapGL
 */
const Map: React.FunctionComponent<MapProps> = (props: MapProps) => {
  const { height } = props;
  return (
    <div className={'w-full'} style={{ height: height || '100%' }}>
      <ReactMapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      />
    </div>
  );
};

export default Map;
