# WalkingApp 🚶‍♂️

A React Native mobile application that generates personalized walking routes based on distance or time preferences. The app uses real-world mapping data to create optimal walking paths and includes features for saving favorite routes and customizing walking speed preferences.

## 🌟 Key Features

- **Smart Route Generation**: Generate walking routes based on specific distance (miles) or time (minutes) preferences
- **Real-World Mapping**: Integrates with OpenRouteService API to create actual walking paths on real roads and trails
- **Fallback Route System**: Automatically generates geometric circular routes when API routes are unavailable
- **Route Saving & Management**: Save, view, and manage your favorite walking routes locally
- **Interactive Maps**: Full-screen map view with start/end markers and route visualization
- **Customizable Walking Speed**: Set your preferred walking pace for accurate time estimates
- **Location Services**: Uses device GPS to generate routes from your current location
- **Cross-Platform**: Built with React Native and Expo for iOS and Android compatibility

## 🛠️ Technologies Used

- **React Native** (0.79.5) - Cross-platform mobile app framework
- **Expo** (53.0.17) - Development platform and build tools
- **TypeScript** (5.8.3) - Type-safe JavaScript development
- **React Navigation** (7.x) - Navigation between app screens
- **React Native Maps** (1.20.1) - Interactive map components
- **Expo Location** (18.1.6) - GPS and location services
- **AsyncStorage** (2.1.2) - Local data persistence
- **OpenRouteService API** - Real-world route generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WalkingApp.git
   cd WalkingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web (experimental)
   npm run web
   ```

### Environment Setup

The app uses the OpenRouteService API for route generation. To set up your API key:

1. **Get your API key**: Sign up at [OpenRouteService](https://openrouteservice.org/) for a free API key
2. **Copy the template**: Copy `src/config/api.example.ts` to `src/config/api.ts`
3. **Add your key**: Replace `"your_api_key_here"` with your actual API key
4. **Keep it secure**: The `api.ts` file is already in `.gitignore` and won't be uploaded to GitHub

**Note**: The `api.ts` file contains your actual API key and is automatically ignored by git for security.

## 📱 Usage

### Generating a Route

1. **Open the app** and grant location permissions when prompted
2. **Choose your mode**:
   - **Miles**: Enter the desired walking distance
   - **Time**: Enter the desired walking duration (in minutes)
3. **Enter your preference** (e.g., "3" for 3 miles or 3 minutes)
4. **Tap "Generate Route"** to create your walking path
5. **View the route** on the interactive map with start/end markers

### Saving Routes

1. **After generating a route**, tap the "Save Route" button
2. **Enter a name** for your route (e.g., "Morning Walk", "Park Loop")
3. **Confirm** to save the route locally
4. **Access saved routes** from the home screen

### Managing Saved Routes

1. **Tap "Saved Routes"** on the home screen
2. **View all your saved routes** with names, distances, and creation dates
3. **Tap on a route** to view it on the map
4. **Delete routes** by tapping the delete button

### Customizing Settings

1. **Tap the settings icon** (⚙️) on the home screen
2. **Adjust your walking speed** (default: 3 mph)
3. **Save your preferences** for future route calculations

## 🗺️ How It Works

### Route Generation Algorithm

The app uses a sophisticated retry mechanism to generate optimal routes:

1. **API Route Generation**: Attempts to fetch real-world walking routes from OpenRouteService
2. **Distance Optimization**: Automatically adjusts requested distances to match actual route availability
3. **Fallback System**: Generates geometric circular routes when API routes are unavailable
4. **Quality Scoring**: Selects the best available route based on distance accuracy

### Technical Architecture

- **Screens**: Home, Map, Saved Routes, Info, and Settings
- **Services**: Route generation, local storage, and location services
- **Navigation**: Stack-based navigation between app sections
- **State Management**: React hooks for local component state
- **Data Persistence**: AsyncStorage for saving routes locally

### Areas for Improvement

- Enhanced route customization options
- Integration with fitness tracking apps
- Offline map support
- Route sharing capabilities
- Performance optimizations
- Additional map styling options

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Walking! 🚶‍♀️🚶‍♂️** 