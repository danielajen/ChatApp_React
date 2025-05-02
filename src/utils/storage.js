import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from './api';
import { Alert } from 'react-native';

const USERS_KEY = 'USERS';
const CURRENT_USER_KEY = 'CURRENT_USER';
const MESSAGES_KEY = 'MESSAGES';

export const saveUser = async (newUser) => {
  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
  users.push(newUser);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = async () => {
  return JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
};

export const setCurrentUser = async (user) => {
  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};
export const setUserToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const getCurrentUser = async () => {
  try {
    const response = await getUser();

    if (response && response.data) {
      console.log('getUser response:', response.data);
      await setCurrentUser(response.data);
      return response.data; // ✅ just return the user object
    } else {
      Alert.alert('Failed to Get User', 'Something missing');
      return null;
    }
  } catch (error) {
    console.error('Get User error:', error?.response?.data?.error);
    Alert.alert('Error', error?.response?.data?.error || 'Something went wrong. Please try again later.');
    return null;
  }
};

export const updateUser = async (updatedUser) => {
    const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY)) || [];
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  };
export const logout = async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
  await AsyncStorage.removeItem("token");
};

// ✅ NEW: Get messages for a specific user
export const getMessagesByUser = async (email) => {
  const messagesMap = JSON.parse(await AsyncStorage.getItem(MESSAGES_KEY)) || {};
  return messagesMap[email] || [];
};

// ✅ NEW: Save message for a specific user
export const saveMessageForUser = async (email, message) => {
  const messagesMap = JSON.parse(await AsyncStorage.getItem(MESSAGES_KEY)) || {};
  const userMessages = messagesMap[email] || [];
  userMessages.push(message);
  messagesMap[email] = userMessages;
  await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messagesMap));
};
