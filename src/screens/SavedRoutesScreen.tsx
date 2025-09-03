import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { loadRoutes, deleteRoute, SavedRoute } from '../services/storageService';
import { savedRoutesScreenStyles } from '../styles/SavedRoutesScreen.styles';
import { Ionicons } from '@expo/vector-icons';

const SavedRoutesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SavedRoutes'>>();
  const [routes, setRoutes] = useState<SavedRoute[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadSavedRoutes();
    }, [])
  );

  const loadSavedRoutes = async () => {
    const savedRoutes = await loadRoutes();
    setRoutes(savedRoutes);
  };

  const handleLoadRoute = (route: SavedRoute) => {
    navigation.navigate('Map', { 
      mode: route.mode, 
      input: route.input,
      savedRoute: route 
    });
  };

  const handleDeleteRoute = (route: SavedRoute) => {
    Alert.alert(
      'Delete Route',
      `Are you sure you want to delete "${route.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteRoute(route.id);
            loadSavedRoutes();
          }
        }
      ]
    );
  };

  const renderRoute = ({ item }: { item: SavedRoute }) => (
    <View style={savedRoutesScreenStyles.routeItem}>
      <View style={savedRoutesScreenStyles.routeInfo}>
        <Text style={savedRoutesScreenStyles.routeName}>{item.name}</Text>
        <Text style={savedRoutesScreenStyles.routeDetails}>
          {item.mode === 'distance' ? `${item.input} miles` : `${item.input} minutes`} 
          {' • '}
          {item.actualDistance.toFixed(2)} miles actual
        </Text>
        <Text style={savedRoutesScreenStyles.routeDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={savedRoutesScreenStyles.routeActions}>
        <TouchableOpacity
          style={savedRoutesScreenStyles.loadButton}
          onPress={() => handleLoadRoute(item)}
        >
          <Text style={savedRoutesScreenStyles.loadButtonText}>Load</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={savedRoutesScreenStyles.deleteButton}
          onPress={() => handleDeleteRoute(item)}
        >
          <Text style={savedRoutesScreenStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[savedRoutesScreenStyles.container, { paddingTop: 60 }]}> 
      <View style={savedRoutesScreenStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={savedRoutesScreenStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222B45" />
        </TouchableOpacity>
      </View>
      <Text style={savedRoutesScreenStyles.title}>Saved Routes</Text>
      {routes.length === 0 ? (
        <View style={savedRoutesScreenStyles.emptyState}>
          <Text style={savedRoutesScreenStyles.emptyText}>No saved routes yet.</Text>
          <Text style={savedRoutesScreenStyles.emptySubtext}>Generate and save a route to see it here.</Text>
        </View>
      ) : (
        <FlatList
          data={routes}
          renderItem={renderRoute}
          keyExtractor={(item) => item.id}
          style={savedRoutesScreenStyles.list}
        />
      )}
    </View>
  );
};

export default SavedRoutesScreen; 