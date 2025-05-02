import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  getCurrentUser,
  logout,
  getMessagesByUser,
  saveMessageForUser,
} from '../utils/storage';

const ChatScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadUserAndMessages = async () => {
        const u = await getCurrentUser();
        console.log('User:', u);
        setUser(u);
        if (u) {
          const storedMessages = await getMessagesByUser(u.email);
          setMessages(storedMessages);
        }
      };
      loadUserAndMessages();
    }, []),
  );

  const handleSend = async () => {
    if (text.trim() && user) {
      const newMsg = {
        id: Date.now(),
        text,
        sender: user.email,
        timestamp: new Date().toISOString(),
      };
      await saveMessageForUser(user.email, newMsg);
      setMessages(prev => [...prev, newMsg]);
      setText('');
    }
  };

  const profileImage = require('../../assets/images/profile-avatar.png'); // Local avatar image
  const sendImage = require('../../assets/images/send.png'); // Local avatar image

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Header greeting with user's name */}
      <Text style={styles.header}>Welcome, {user?.name}</Text>

      {/* Chat messages list */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBox,
              item.sender === user?.email ? styles.self : styles.other,
            ]}>
            <Text
              style={
                item.sender === user?.email ? styles.selfText : styles.otherText
              }>
              {user?.name}: {item.text}
            </Text>
          </View>
        )}
      />

      {/* Message input and send button */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image source={sendImage} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2F',
    padding: 16,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  messageBox: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    maxWidth: '80%',
  },
  self: {
    backgroundColor: '#3b9b57', // Dark green for self messages
    alignSelf: 'flex-end',
  },
  other: {
    backgroundColor: '#444',
    alignSelf: 'flex-start',
  },
  selfText: {
    color: '#fff',
    fontSize: 16,
  },
  otherText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#2A2A3D',
    borderWidth: 1,
    borderColor: '#444',
    padding: 12,
    borderRadius: 25,
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#6C63FF',
    padding: 12,
    borderRadius: 50,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatScreen;
