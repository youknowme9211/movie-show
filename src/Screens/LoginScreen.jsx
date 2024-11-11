import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../Utils/Colors';
import { signIn } from '../api/auth';
import SelectCity from './SelectCity';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await signIn(email, password); // Call the signIn function from authService
        console.log('Login successful:', response);
        if(response) navigation.replace('SelectCity'); // Replace to SelectCity screen after login
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed! Please check your credentials and try again.');
      }
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: useColors.white,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: useColors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: useColors.grey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: useColors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
