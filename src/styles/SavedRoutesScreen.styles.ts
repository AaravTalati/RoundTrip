import { StyleSheet } from 'react-native';

export const savedRoutesScreenStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  list: { 
    flex: 1 
  },
  routeItem: { 
    backgroundColor: '#f8f9fa', 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  routeInfo: { 
    flex: 1 
  },
  routeName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  routeDetails: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 2 
  },
  routeDate: { 
    fontSize: 12, 
    color: '#999' 
  },
  routeActions: { 
    flexDirection: 'row', 
    gap: 8 
  },
  loadButton: { 
    backgroundColor: '#007AFF', 
    padding: 8, 
    borderRadius: 6 
  },
  loadButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  deleteButton: { 
    backgroundColor: '#FF3B30', 
    padding: 8, 
    borderRadius: 6 
  },
  deleteButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  emptyState: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    fontSize: 18, 
    color: '#666', 
    marginBottom: 8 
  },
  emptySubtext: { 
    fontSize: 14, 
    color: '#999', 
    textAlign: 'center' 
  },
  backButtonContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
}); 