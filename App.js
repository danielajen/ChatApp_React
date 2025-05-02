import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // null means loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Adjust key name if needed
        setInitialRoute(token ? 'Chat' : 'Login');
      } catch (e) {
        console.error('Error checking token', e);
        setInitialRoute('Login');
      }
    };
    checkToken();
  }, []);

  if (!initialRoute) {
    // Show a loader while checking token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2A2A3D" />
      </View>
    );
  }

  return <AppNavigator initialRoute={initialRoute} />;
}
