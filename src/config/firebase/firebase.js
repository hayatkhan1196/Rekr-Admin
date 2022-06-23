import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCaOxS1jwfaJB5gTvQc1nvg7VbcHXsjeDE",
  authDomain: "rekr-161b7.firebaseapp.com",
  projectId: "rekr-161b7",
  storageBucket: "rekr-161b7.appspot.com",
  messagingSenderId: "533412933327",
  appId: "1:533412933327:web:32b20b98238fd275cd11ba"
};
  
  // Initialize Firebase


  const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(Firebase);
export const storage = getStorage(Firebase);
export default Firebase