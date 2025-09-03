import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedRoute {
  id: string;
  name: string;
  mode: 'distance' | 'time';
  input: string;
  actualDistance: number;
  coordinates: { latitude: number; longitude: number }[];
  createdAt: string;
}

const ROUTES_STORAGE_KEY = 'saved_routes';

export async function saveRoute(route: Omit<SavedRoute, 'id' | 'createdAt'>): Promise<void> {
  try {
    const existingRoutes = await loadRoutes();
    const newRoute: SavedRoute = {
      ...route,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedRoutes = [...existingRoutes, newRoute];
    await AsyncStorage.setItem(ROUTES_STORAGE_KEY, JSON.stringify(updatedRoutes));
  } catch (error) {
    console.error('Error saving route:', error);
  }
}

export async function loadRoutes(): Promise<SavedRoute[]> {
  try {
    const routesJson = await AsyncStorage.getItem(ROUTES_STORAGE_KEY);
    return routesJson ? JSON.parse(routesJson) : [];
  } catch (error) {
    console.error('Error loading routes:', error);
    return [];
  }
}

export async function deleteRoute(routeId: string): Promise<void> {
  try {
    const existingRoutes = await loadRoutes();
    const updatedRoutes = existingRoutes.filter(route => route.id !== routeId);
    await AsyncStorage.setItem(ROUTES_STORAGE_KEY, JSON.stringify(updatedRoutes));
  } catch (error) {
    console.error('Error deleting route:', error);
  }
} 