"use server"

import {initializeApp, getApp, getApps} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlUlaakTIqfEjTZnaOC0wXraDHRBv9Uso",
  authDomain: "prepview-fb5a4.firebaseapp.com",
  projectId: "prepview-fb5a4",
  storageBucket: "prepview-fb5a4.firebasestorage.app",
  messagingSenderId: "341872413755",
  appId: "1:341872413755:web:8890e00d80a34707c8201e",
  measurementId: "G-FQS6NQTSQ1"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
