import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('673234ae001cb9aefb5c') // Replace with your Appwrite project ID
  .setPlatform('bookmyshow');

export default client;
