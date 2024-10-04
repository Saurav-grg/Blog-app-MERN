import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'zenithquest-5baea.firebaseapp.com',
  projectId: 'zenithquest-5baea',
  storageBucket: 'zenithquest-5baea.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: '1:655507289531:web:5b142455db03c1b22dc09e',
  measurementId: 'G-X6RSSK9CRC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
