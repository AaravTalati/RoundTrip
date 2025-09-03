import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { infoScreenStyles } from '../styles';
import { Ionicons } from '@expo/vector-icons';

const InfoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Info'>>();

  return (
    <ScrollView style={[infoScreenStyles.container, { paddingTop: 60 }]}>
      <View style={infoScreenStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={infoScreenStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222B45" />
        </TouchableOpacity>
      </View>
      <Text style={infoScreenStyles.centeredTitle}>Info</Text>
      <View style={infoScreenStyles.titleUnderline} />


      <View style={infoScreenStyles.content}>
        <View style={infoScreenStyles.section}>
          <Text style={infoScreenStyles.sectionTitle}>What This App Does</Text>
          <Text style={infoScreenStyles.description}>
            This app generates personalized walking routes that start and end at your current location. 
            It creates looped routes so you can walk from your starting point and return without retracing your steps.
          </Text>
        </View>

        <View style={infoScreenStyles.section}>
          <Text style={infoScreenStyles.sectionTitle}>How to Generate a Route</Text>
          <View style={infoScreenStyles.step}>
            <Text style={infoScreenStyles.stepNumber}>1</Text>
            <Text style={infoScreenStyles.stepText}>
              Choose between "Miles" or "Time (min)" mode on the home screen
            </Text>
          </View>
          <View style={infoScreenStyles.step}>
            <Text style={infoScreenStyles.stepNumber}>2</Text>
            <Text style={infoScreenStyles.stepText}>
              Enter your desired distance (up to 20 miles) or time (up to 400 minutes)
            </Text>
          </View>
          <View style={infoScreenStyles.step}>
            <Text style={infoScreenStyles.stepNumber}>3</Text>
            <Text style={infoScreenStyles.stepText}>
              Tap "Generate Route" to create your personalized walking path
            </Text>
          </View>
        </View>

        

        <View style={infoScreenStyles.section}>
          <Text style={infoScreenStyles.sectionTitle}>Saving Routes</Text>
          <Text style={infoScreenStyles.description}>
            After generating a route, you can save it with a custom name. 
            Saved routes can be accessed from the "Saved Routes" button on the home screen.
          </Text>
        </View>

        <View style={infoScreenStyles.section}>
          <Text style={infoScreenStyles.sectionTitle}>Tips</Text>
          <Text style={infoScreenStyles.description}>
            • The app uses OpenRouteService for real-world walking paths{'\n'}
            • Routes are designed to be safe for pedestrians{'\n'}
            • Actual route distance may vary slightly from your input{'\n'}
            • Make sure location services are enabled for best results{'\n'}
            • If route generation fails, a geometric circle will be shown as fallback
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoScreen; 