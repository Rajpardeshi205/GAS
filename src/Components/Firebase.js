import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDvJo1B92-ZjeojUcJjG2BwkGpFa6F7hrk",
  authDomain: "login-f8151.firebaseapp.com",
  databaseURL: "https://login-f8151.firebaseio.com",
  projectId: "login-f8151",
  storageBucket: "login-f8151.appspot.com",
  messagingSenderId: "298529475118",
  appId: "1:298529475118:web:ecbcc3ddb37bee54212dbf",
  measurementId: "G-X3SC8EGL9H",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, onAuthStateChanged, signOut };
