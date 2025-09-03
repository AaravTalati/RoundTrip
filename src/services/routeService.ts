// Fallback route generation when API fails
export function generateCircularRoute(
  latitude: number,
  longitude: number,
  distanceKm: number,
  numPoints: number = 20
): { latitude: number; longitude: number }[] {
  const R = 6371; // Earth's radius in km
  const radius = distanceKm / (2 * Math.PI);
  const points = [];
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (2 * Math.PI * i) / numPoints;
    const dLat = (radius / R) * Math.cos(angle);
    const dLng = (radius / R) * Math.sin(angle) / Math.cos(latitude * Math.PI / 180);
    const lat = latitude + (dLat * 180) / Math.PI;
    const lng = longitude + (dLng * 180) / Math.PI;
    points.push({ latitude: lat, longitude: lng });
  }
  
  points.push(points[0]); // Close the loop
  return points;
}

// Import API key from config
import { OPENROUTE_API_KEY } from '../config/api';

const API_KEY = OPENROUTE_API_KEY;

export type RouteResult = {
  coordinates: { latitude: number; longitude: number }[];
  distanceMiles: number;
};

export async function fetchWalkingRoute(
  start: { latitude: number; longitude: number },
  distanceMiles: number,
  options?: { points?: number; seed?: number }
): Promise<RouteResult | null> {
  try {
    const distanceMeters = distanceMiles * 1609.34;
    const requestBody = {
      coordinates: [[start.longitude, start.latitude]],
      options: { 
        round_trip: { 
          length: distanceMeters, 
          points: options?.points || 12, 
          seed: options?.seed 
        } 
      },
      profile: "foot-walking",
      format: "geojson"
    };

    const response = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    if (!data.features || !data.features.length) {
      return null;
    }

    const coordinates = data.features[0].geometry.coordinates.map(
      (coord: number[]) => ({ latitude: coord[1], longitude: coord[0] })
    );
    
    const actualDistanceMeters = data.features[0].properties.summary.distance;
    const actualDistanceMiles = actualDistanceMeters / 1609.34;

    return { coordinates, distanceMiles: actualDistanceMiles };
  } catch (error) {
    console.error('Error fetching walking route:', error);
    return null;
  }
} 