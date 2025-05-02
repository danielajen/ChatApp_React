import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {
  getCurrentUser,
  setCurrentUser,
  updateUser,
  logout,
} from '../utils/storage';
import {updateProfile} from '../utils/api';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({name: '', email: ''});
  const [editable, setEditable] = useState(false);

  // Load current user data on screen mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };

    loadUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile(user); // This calls the API to update the profile

      if (response?.data) {
        await setCurrentUser(response.data); // Store updated user in AsyncStorage
        await updateUser(response.data); // Update local state
        setEditable(false); // Exit edit mode
      } else {
        Alert.alert('Update Failed', 'No response from server');
      }
    } catch (error) {
      console.error('Update error:', error?.response?.data || error.message);
      Alert.alert(
        'Error',
        error?.response?.data?.error || 'Failed to update profile',
      );
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1E2F" />
      <View style={styles.container}>
        {/* Name Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={text => setUser({...user, name: text})}
            editable={editable} // Editable only in edit mode
          />
        </View>

        {/* Email Field (Non-editable) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.inputDisabled}
            value={user.email}
            onChangeText={text => setUser({...user, email: text})}
            editable={false} // Always read-only
          />
        </View>

        {/* Edit or Save Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={editable ? handleUpdateProfile : () => setEditable(true)}>
          <Text style={styles.buttonText}>{editable ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1E1E2F', // Dark background
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
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
    backgroundColor: '#2A2A3D', // Same background as Register and Login screens
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: '#3A3A4B', // A lighter shade of the original input background
    color: '#888', // Muted gray for the text color
    fontSize: 16,
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#6C63FF', // Same button color
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
  logoutButton: {
    backgroundColor: '#FF4B4B', // Red background for logout
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
