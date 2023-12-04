// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCpzAqg9nYihl21i3vTjlE9Er0ssXdTTc',
  authDomain: 'labapp-128da.firebaseapp.com',
  projectId: 'labapp-128da',
  storageBucket: 'labapp-128da.appspot.com',
  messagingSenderId: '1056900911915',
  appId: '1:1056900911915:web:fe9feba5464a5b85166b6e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
