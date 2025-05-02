import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API URL
const URL = 'http://localhost:8080/api/';

//  Auth Header Helper
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };
};

//  Register User
export const registerUser = async (body) => {
  return axios.post(`${URL}register`, body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

//  Login User
export const loginUser = async (body) => {
  return axios.post(`${URL}login`, body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

//  Get Current User Info
export const getUser = async () => {
  return axios.get(`${URL}profile`, await getAuthHeader());
};

//  Update User Info
export const updateProfile = async (body) => {
  const token = await AsyncStorage.getItem('token');
  return axios.patch(`${URL}profile`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
