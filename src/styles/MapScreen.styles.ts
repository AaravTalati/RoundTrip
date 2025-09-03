import { StyleSheet } from 'react-native';

export const mapScreenStyles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  map: { 
    flex: 1 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  distanceText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    margin: 8 
  },
  fallbackText: { 
    fontSize: 15, 
    color: 'orange', 
    textAlign: 'center', 
    margin: 8 
  },
  debugText: { 
    fontSize: 13, 
    color: 'gray', 
    textAlign: 'center', 
    margin: 4 
  },
  saveButton: { 
    backgroundColor: '#34C759', 
    padding: 12, 
    borderRadius: 8, 
    margin: 8, 
    alignSelf: 'center' 
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  saveDialog: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveDialogContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  saveDialogTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  saveDialogInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveDialogButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  cancelButton: { 
    backgroundColor: '#FF3B30', 
    padding: 12, 
    borderRadius: 8, 
    flex: 1, 
    marginRight: 8 
  },
  cancelButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  confirmButton: { 
    backgroundColor: '#34C759', 
    padding: 12, 
    borderRadius: 8, 
    flex: 1, 
    marginLeft: 8 
  },
  confirmButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  directionMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C853', // Green color for direction markers
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