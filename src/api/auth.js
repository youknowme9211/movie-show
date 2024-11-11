import { Account } from 'appwrite';
import client from './appwriteService';
const account = new Account(client);

export const signUp = async (email, password, name) => {
    try {
      // Generate a valid userId (could be based on email or username)
      const userId = email.split('@')[0]; // Example: use the part before "@" in email
  
      // Call Appwrite API to create account with a custom userId
      const response = await account.create(userId, email, password, name);
      console.log(response); // Success
    } catch (error) {
      console.error('Error signing up:', error); // Handle errors
    }
  };

export const signIn = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('response',response); // Success
      return response
    } catch (error) {
      console.error(error); // Handle errors
    }
  };