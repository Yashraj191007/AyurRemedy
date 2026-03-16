/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../firebase-applet-config.json';

// Use environment variables if available (for Netlify/Production), 
// otherwise fallback to the local config file (for AI Studio)
const isProd = import.meta.env.PROD;

const firebaseConfig = {
  apiKey: (isProd && import.meta.env.VITE_FIREBASE_API_KEY) || firebaseConfigJson.apiKey,
  authDomain: (isProd && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || firebaseConfigJson.authDomain,
  projectId: (isProd && import.meta.env.VITE_FIREBASE_PROJECT_ID) || firebaseConfigJson.projectId,
  storageBucket: (isProd && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || firebaseConfigJson.storageBucket,
  messagingSenderId: (isProd && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || firebaseConfigJson.messagingSenderId,
  appId: (isProd && import.meta.env.VITE_FIREBASE_APP_ID) || firebaseConfigJson.appId,
};

// Database ID logic: prioritize config in dev, env in prod
let rawDatabaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';
if (isProd && import.meta.env.VITE_FIREBASE_DATABASE_ID) {
  rawDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID;
}

// Sanitize Database ID: If it's a URL (common mistake), extract just the ID or fallback to the config's ID
let sanitizedDatabaseId = rawDatabaseId;
if (rawDatabaseId.includes('://') || rawDatabaseId.includes('.app')) {
  console.warn("VITE_FIREBASE_DATABASE_ID appears to be a URL. Firestore requires a Database ID. Falling back to the ID from firebase-applet-config.json.");
  sanitizedDatabaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';
}

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, sanitizedDatabaseId);
export const auth = getAuth(app);

console.log("Firebase initialized in", isProd ? "production" : "development", "mode");
console.log("Project ID:", firebaseConfig.projectId);
console.log("Database ID:", sanitizedDatabaseId);

// Test connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connected successfully");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}

testConnection();
