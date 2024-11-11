import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '../Utils/Colors';
import { signUp } from '../api/auth'; // Import your service file
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigation = useNavigation(); // Initialize the navigation hook

  const handleSignUp = async () => {
    try {
      // Attempt to sign up
      await signUp(email, password, name);

      // After successful signup, navigate to the Login screen
      navigation.replace('Login'); // Use replace to avoid going back to SignUp
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleLoginRedirect = () => {
    // Navigate to the Login screen
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already a user? Login button */}
      <TouchableOpacity style={styles.loginLink} onPress={handleLoginRedirect}>
        <Text style={styles.loginText}>Already a user? Login</Text>
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
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: useColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
