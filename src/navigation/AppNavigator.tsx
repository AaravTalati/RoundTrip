import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SavedRoutesScreen from '../screens/SavedRoutesScreen';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { SavedRoute } from '../services/storageService';

export type RootStackParamList = {
  Home: undefined;
  Map: { mode: string; input: string; savedRoute?: SavedRoute };
  SavedRoutes: undefined;
  Info: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="SavedRoutes" component={SavedRoutesScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 