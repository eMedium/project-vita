// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, setAnalyticsCollectionEnabled } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getPerformance } from 'firebase/performance';

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjvGaCPReYWC10fh9wOq0kyTwWPc_hBrc",
  authDomain: "tycoonr-electronic.firebaseapp.com",
  projectId: "tycoonr-electronic",
  storageBucket: "tycoonr-electronic.appspot.com",
  messagingSenderId: "747952504808",
  appId: "1:747952504808:web:db984b5f4c85ffa26c2e5d",
  measurementId: "G-SJEL7RQTMH"
};

// Inicjalizacja Firebase App tylko wtedy, gdy nie jest już zainicjalizowana
const initializeFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

// Lazy loading dla Firestore
export const getFirestoreInstance = () => {
  const app = initializeFirebaseApp();
  return getFirestore(app);
};

// Lazy loading dla Auth
export const getAuthInstance = () => {
  const app = initializeFirebaseApp();
  return getAuth(app);
};

// Lazy loading dla Performance
export const getPerformanceInstance = () => {
  const app = initializeFirebaseApp();
  return getPerformance(app);
};

// Lazy loading dla Analytics - inicjalizowane tylko przy zgodzie
export const initializeAnalytics = async (userConsent: boolean) => {
  const app = initializeFirebaseApp();
  // Zablokuj zbieranie danych, jeśli działamy na localhost lub bez zgody
  if (userConsent && window.location.hostname !== 'localhost' && await isSupported()) {
    const analytics = getAnalytics(app);
    setAnalyticsCollectionEnabled(analytics, true); // Ustaw zbieranie danych tylko przy zgodzie
    return analytics;
  }
  return null;
};
