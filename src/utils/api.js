import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'; // Add platform detection

// 1. Configure base URL for dev/prod and Android/iOS
const BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api/' // Android emulator
    : 'http://localhost:8080/api/' // iOS simulator or physical device (use IP if needed)
  : 'https://prod-api.example.com/api/'; // Production

// 2. Set default headers
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Auth Header Helper
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('No token found');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Register User
export const registerUser = async (body) => {
  try {
    return await axios.post(`${BASE_URL}register`, body);
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (body) => {
  try {
    return await axios.post(`${BASE_URL}login`, body);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Get Current User
export const getUser = async () => {
  try {
    return await axios.get(`${BASE_URL}profile`, await getAuthHeader());
  } catch (error) {
    console.error('Fetch user failed:', error);
    throw error;
  }
};

// Update User
export const updateProfile = async (body) => {
  try {
    return await axios.patch(`${BASE_URL}profile`, body, await getAuthHeader());
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};
