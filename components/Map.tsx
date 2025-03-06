'use server';
import * as React from 'react';
import { ViewState } from 'react-map-gl/mapbox';
import { headers } from 'next/headers';
import ClientMap from './ClientMap';

export interface MapProps {
  /** Height of the map in the container. Defaults to 100% */
  height?: string | number;
}

export interface LatLng extends Pick<ViewState, 'longitude' | 'latitude'> {}

/**
 * Server component that wraps the client-side map functionality
 */
export default async function Map(props: MapProps) {
  const initialLocation = await getLocationFromIP();
  return <ClientMap {...props} initialCoordinates={initialLocation} />;
}

async function getLocationFromIP(): Promise<LatLng | null> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for') || '';
    const realIp = headersList.get('x-real-ip') || '';
    const ip = forwardedFor.split(',')[0] || realIp;

    if (!ip) return null;

    // Using ipapi.co which has a free tier and doesn't require API key for low volume
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.latitude && data.longitude) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting location from IP:', error);
    return null;
  }
}
