// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ initialRoute }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: '#2A2A3D' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
