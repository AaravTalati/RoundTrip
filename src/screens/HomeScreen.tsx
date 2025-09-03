import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { homeScreenStyles } from '../styles/HomeScreen.styles';
import { Ionicons } from '@expo/vector-icons';

const MAX_MILES = 20;
const MAX_MINUTES = 400; // 20 miles at 3 mph

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const [mode, setMode] = useState<'distance' | 'time'>('distance');
  const [input, setInput] = useState('');
  const [warning, setWarning] = useState('');

  const handleInputChange = (val: string) => {
    const num = parseFloat(val);
    if (mode === 'distance' && num > MAX_MILES) {
      setWarning('Maximum distance is 20 miles.');
      setInput(MAX_MILES.toString());
      return;
    }
    if (mode === 'time' && num > MAX_MINUTES) {
      setWarning('Maximum time is 400 minutes.');
      setInput(MAX_MINUTES.toString());
      return;
    }
    setWarning('');
    setInput(val.replace(/[^0-9.]/g, ''));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[homeScreenStyles.background, { paddingTop: 60 }]}>
        <View style={{ position: 'absolute', top: 70, right: 20, zIndex: 10 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30, paddingVertical: 6, paddingHorizontal: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 4 }}>
            <TouchableOpacity
              style={{ marginRight: 8 }}
              onPress={() => navigation.navigate('Info')}
            >
              <Text style={{ fontSize: 22, color: '#007AFF' }}>ℹ️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={24} color="#222B45" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Logo at the very top, above the card */}
        <View style={homeScreenStyles.logoContainer}>
          <Image
            source={require('../../assets/splash-icon.png')}
            style={homeScreenStyles.logoLarge}
          />
        </View>
        <View style={homeScreenStyles.card}>
          <Text style={homeScreenStyles.title}>Generate Walking Route</Text>
          <View style={homeScreenStyles.toggleRow}>
            <TouchableOpacity
              style={[homeScreenStyles.toggle, mode === 'distance' && homeScreenStyles.selectedToggle]}
              onPress={() => {
                setMode('distance');
                setInput('');
                setWarning('');
              }}
            >
              <Text style={homeScreenStyles.toggleText}>Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[homeScreenStyles.toggle, mode === 'time' && homeScreenStyles.selectedToggle]}
              onPress={() => {
                setMode('time');
                setInput('');
                setWarning('');
              }}
            >
              <Text style={homeScreenStyles.toggleText}>Time (min)</Text>
            </TouchableOpacity>
          </View>
          <TextInput // reset
            key={mode} 
            style={homeScreenStyles.input}
            placeholder={mode === 'distance' ? 'Enter distance (miles)' : 'Enter time (minutes)'}
            keyboardType="numeric"
            value={input}
            onChangeText={handleInputChange}
            maxLength={5}
          />
          {warning ? <Text style={homeScreenStyles.warning}>{warning}</Text> : null}
          <TouchableOpacity
            style={homeScreenStyles.button}
            onPress={() => navigation.navigate('Map', { mode, input })}
            disabled={!input || parseFloat(input) <= 0}
          >
            <Text style={homeScreenStyles.buttonText}>Generate Route</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeScreenStyles.secondaryButton}
            onPress={() => navigation.navigate('SavedRoutes')}
          >
            <Text style={homeScreenStyles.secondaryButtonText}>Saved Routes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;   