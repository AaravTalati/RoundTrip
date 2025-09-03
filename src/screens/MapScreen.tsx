import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { generateCircularRoute, fetchWalkingRoute, RouteResult } from '../services/routeService';
import { saveRoute, SavedRoute } from '../services/storageService';
import { mapScreenStyles } from '../styles/MapScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MAX_ATTEMPTS = 10;
const OVERAGE_THRESHOLD = 1.3;
const UNDERAGE_THRESHOLD = 0.8;

const DEFAULT_WALKING_SPEED = 3; 

const MapScreen: React.FC<{ route: any }> = ({ route }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[] | null>(null);
  const [actualDistance, setActualDistance] = useState<number | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);
  const [lastRouteDistance, setLastRouteDistance] = useState<number | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [walkingSpeed, setWalkingSpeed] = useState(DEFAULT_WALKING_SPEED);

  const { mode, input, savedRoute } = route.params || {};
  const navigation = useNavigation();

  async function getRouteWithRetries(
    start: { latitude: number; longitude: number },
    distanceMiles: number,
    points: number = 6
  ): Promise<RouteResult | null> {
    let reqDistance = distanceMiles;
    let lastDistance: number | null = null;
    let bestRoute: RouteResult | null = null;
    let bestScore = Infinity;
    
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const seed = Math.floor(Math.random() * 1000000);
      const route: RouteResult | null = await fetchWalkingRoute(
        start,
        reqDistance,
        { points, seed }
      );
      
      if (route && route.coordinates.length > 0) {
        lastDistance = route.distanceMiles;
        console.log(`Route attempt ${attempt + 1}: actual distance = ${route.distanceMiles.toFixed(2)} miles`);
        
        const distanceDiff = Math.abs(route.distanceMiles - distanceMiles);
        const score = distanceDiff / distanceMiles;
        if (score < bestScore) {
          bestScore = score;
          bestRoute = route;
        }
        
        if (
          route.distanceMiles <= distanceMiles * OVERAGE_THRESHOLD &&
          route.distanceMiles >= distanceMiles * UNDERAGE_THRESHOLD
        ) {
          setFallbackReason(null);
          setLastRouteDistance(null);
          return route;
        }
        
        if (route.distanceMiles > distanceMiles * OVERAGE_THRESHOLD) {
          reqDistance = reqDistance * (distanceMiles / route.distanceMiles) * 0.9; // shrink more aggressively
        } else if (route.distanceMiles < distanceMiles * UNDERAGE_THRESHOLD) {
          reqDistance = reqDistance * (distanceMiles / route.distanceMiles) * 1.1; // grow more aggressively
        }
        
        reqDistance *= (0.9 + Math.random() * 0.2); 
      } else {
        reqDistance *= (0.8 + Math.random() * 0.4);
      }
      
      reqDistance = Math.max(0.1, Math.min(50, reqDistance));
    }
    
    
    if (bestRoute) {
      setFallbackReason(`Could not generate a route exactly matching your input. Showing the best available route (${bestRoute.distanceMiles.toFixed(2)} miles).`);
      setLastRouteDistance(null);
      return bestRoute;
    }
    
    setFallbackReason('Could not generate a real-world route for your input. Showing a geometric circle instead.');
    setLastRouteDistance(lastDistance);
    return null;
  }



  const handleSaveRoute = async () => {
    if (!routeName.trim()) {
      Alert.alert('Error', 'Please enter a route name.');
      return;
    }
    if (!routeCoords || !actualDistance) {
      Alert.alert('Error', 'No route to save.');
      return;
    }
    await saveRoute({
      name: routeName.trim(),
      mode,
      input,
      actualDistance,
      coordinates: routeCoords,
    });
    setShowSaveDialog(false);
    setRouteName('');
    Alert.alert('Success', 'Route saved successfully!');
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to show your position.');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      
      if (savedRoute) {
        setRouteCoords(savedRoute.coordinates);
        setActualDistance(savedRoute.actualDistance);
        setLoading(false);
        return;
      }

      let distanceMiles = parseFloat(input) || 1;
      if (mode === 'time') {
        
        distanceMiles = (parseFloat(input) / 60) * 3;
      }
      
      const route = await getRouteWithRetries(
        { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
        distanceMiles,
        6
      );
      if (route && route.coordinates.length > 0) {
        setRouteCoords(route.coordinates);
        setActualDistance(route.distanceMiles);
        setLoading(false);
        return;
      }
      
      const coords = generateCircularRoute(
        loc.coords.latitude,
        loc.coords.longitude,
        distanceMiles * 1.60934 //miles to kilometers
      );
      setRouteCoords(coords);
      setActualDistance(null);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('walking_speed');
      if (stored) setWalkingSpeed(parseFloat(stored));
    })();
  }, []);

  if (loading) {
    return (
      <View style={mapScreenStyles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>
    );
  }

  if (!location) {
    return (
      <View style={mapScreenStyles.centered}><Text>Location not available.</Text></View>
    );
  }

  const region: Region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

 function getDirectionMarkers(coords: { latitude: number; longitude: number }[], interval: number = 8) {
    const markers = [];
    for (let i = 0; i < coords.length - 1; i += interval) {
      if (i + 1 < coords.length) {
        markers.push({
          coordinate: coords[i],
        });
      }
    }
    return markers;
  }

  const directionMarkers = routeCoords ? getDirectionMarkers(routeCoords, 8) : [];
  const startCoord = routeCoords ? routeCoords[0] : null;
  const endCoord = routeCoords ? routeCoords[routeCoords.length - 1] : null;

  let estimatedMinutes: number | null = null;
  if (actualDistance && walkingSpeed > 0) {
    estimatedMinutes = (actualDistance / walkingSpeed) * 60;
  }

  return (
    <View style={[mapScreenStyles.container, { paddingTop: 60 }]}>
      <View style={mapScreenStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={mapScreenStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222B45" />
        </TouchableOpacity>
      </View>
      {fallbackReason && (
        <Text style={mapScreenStyles.fallbackText}>{fallbackReason}</Text>
      )}
      {actualDistance !== null && (
        <Text style={mapScreenStyles.distanceText}>
          Actual route distance: {actualDistance.toFixed(2)} miles
        </Text>
      )}
      {estimatedMinutes !== null && (
        <Text style={mapScreenStyles.distanceText}>
          Estimated time: {Math.round(estimatedMinutes)} min @ {walkingSpeed} mph
        </Text>
      )}
      {lastRouteDistance !== null && (
        <Text style={mapScreenStyles.debugText}>
          Last attempted route distance: {lastRouteDistance.toFixed(2)} miles
        </Text>
      )}
      {!savedRoute && routeCoords && actualDistance && (
        <TouchableOpacity
          style={mapScreenStyles.saveButton}
          onPress={() => setShowSaveDialog(true)}
        >
          <Text style={mapScreenStyles.saveButtonText}>Save Route</Text>
        </TouchableOpacity>
      )}
      <MapView style={mapScreenStyles.map} initialRegion={region} showsUserLocation>
        {startCoord && (
          <Marker coordinate={startCoord} pinColor="green" title="Start" />
        )}
        {endCoord && (
          <Marker coordinate={endCoord} pinColor="red" title="End" />
        )}
        {routeCoords && (
          <Polyline coordinates={routeCoords} strokeColor="#007AFF" strokeWidth={4} />
        )}
        {/* Draw direction markers */}
        {directionMarkers.map((marker, idx) => (
          <Marker
            key={idx}
            coordinate={marker.coordinate}
          >
            <View style={mapScreenStyles.directionMarker} />
          </Marker>
        ))}
      </MapView>
      {showSaveDialog && (
        <View style={mapScreenStyles.saveDialog}>
          <View style={mapScreenStyles.saveDialogContent}>
            <Text style={mapScreenStyles.saveDialogTitle}>Save Route</Text>
            <TextInput
              style={mapScreenStyles.saveDialogInput}
              placeholder="Enter route name"
              value={routeName}
              onChangeText={setRouteName}
              autoFocus
            />
            <View style={mapScreenStyles.saveDialogButtons}>
              <TouchableOpacity
                style={mapScreenStyles.cancelButton}
                onPress={() => {
                  setShowSaveDialog(false);
                  setRouteName('');
                }}
              >
                <Text style={mapScreenStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={mapScreenStyles.confirmButton}
                onPress={handleSaveRoute}
              >
                <Text style={mapScreenStyles.confirmButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default MapScreen; 