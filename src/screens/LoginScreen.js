import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {getUsers, setCurrentUser, setUserToken} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from '../utils/api';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   const users = await getUsers();
  //   const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
  //   if (user) {
  //     await setCurrentUser(user);
  //     navigation.navigate('Chat');
  //   } else {
  //     Alert.alert('Invalid credentials');
  //   }
  // };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }

    try {
      // Call the login API
      const response = await loginUser({email, password});

      if (response && response.data) {
        console.log('Login response:', response.data);
        setUserToken(response.data.token);

        // Navigate to Chat screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Chat" }],
        });
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response.data.error);
      Alert.alert(
        'Error',
        error?.response?.data?.error ||
          'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Sets the status bar style and background */}
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2F" />

      <View style={styles.container}>
        {/* Screen title */}
        <Text style={styles.title}>Welcome Back</Text>

        {/* Email input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Password input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Navigation link to Register screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1E1E2F',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2A2A3D',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
