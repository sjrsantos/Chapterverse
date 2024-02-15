// Firebase Config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC84Cm3g6a_QDS4L9_Evp79et62H8K5AEQ",
  authDomain: "books-app-73853.firebaseapp.com",
  projectId: "books-app-73853",
  storageBucket: "books-app-73853.appspot.com",
  messagingSenderId: "547769541784",
  appId: "1:547769541784:web:057ad6d56a92d95a539ced",
  measurementId: "G-4QZ4FN0QE4",
};

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const firestore = getFirestore(app);

export default firestore;
