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
import {saveUser, getUsers} from '../utils/storage';
import {registerUser} from '../utils/api';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      const response = await registerUser({
        name,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Registered successfully');
        // console.log('User registered:', response.data);
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration failed');
      }
    } catch (error) {
      console.log('Registration error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Something went wrong',
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2F" />
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterScreen;
