import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { settingsScreenStyles } from '../styles/SettingsScreen.styles';

const WALKING_SPEED_KEY = 'walking_speed';

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settings'>>();
  const [walkingSpeed, setWalkingSpeed] = useState('3');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(WALKING_SPEED_KEY);
      if (stored) setWalkingSpeed(stored);
      setLoading(false);
    })();
  }, []);

  const saveSpeed = async () => {
    const speedNum = parseFloat(walkingSpeed);
    if (isNaN(speedNum) || speedNum <= 0) {
      Alert.alert('Invalid speed', 'Please enter a valid walking speed (mph).');
      return;
    }
    await AsyncStorage.setItem(WALKING_SPEED_KEY, walkingSpeed);
    Alert.alert('Saved', 'Walking speed updated!');
    navigation.goBack();
  };

  if (loading) return null;

  return (
    <View style={settingsScreenStyles.container}>
      <View style={settingsScreenStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={settingsScreenStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222B45" />
        </TouchableOpacity>
      </View>
      <Text style={settingsScreenStyles.centeredTitle}>Settings</Text>
      <View style={settingsScreenStyles.titleUnderline} />
      <Text style={settingsScreenStyles.leftAlignedText}>Average Walking Speed (mph):</Text>
      <TextInput
        style={settingsScreenStyles.leftAlignedInput}
        keyboardType="numeric"
        value={walkingSpeed}
        onChangeText={setWalkingSpeed}
        maxLength={4}
      />
      <TouchableOpacity onPress={saveSpeed} style={settingsScreenStyles.leftAlignedButton}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
} 