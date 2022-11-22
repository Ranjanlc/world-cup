// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6O2hfK8vywrAPXcI8P-pcgIAwjxNiOfM',
  authDomain: 'world-cup-fa973.firebaseapp.com',
  databaseURL: 'https://world-cup-fa973-default-rtdb.firebaseio.com',
  projectId: 'world-cup-fa973',
  storageBucket: 'world-cup-fa973.appspot.com',
  messagingSenderId: '825893210307',
  appId: '1:825893210307:web:9c76825cfc9fc5f91c3a76',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
