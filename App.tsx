import React from 'react';
import * as Font from 'expo-font';
import { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    
    'AgencyFB': require('./assets/fonts/lbrited.ttf'),
  });

  if (!fontsLoaded) {
    // Show nothing or a custom loading component while fonts load
    return null;
  }

  return <AppNavigator />;
}
