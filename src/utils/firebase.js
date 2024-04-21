// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp2V3lC5np5g7368aJhpJUYrEbamVl5RI",
  authDomain: "netflixgpt-9ccc1.firebaseapp.com",
  projectId: "netflixgpt-9ccc1",
  storageBucket: "netflixgpt-9ccc1.appspot.com",
  messagingSenderId: "963453507318",
  appId: "1:963453507318:web:8185aa3fa0c4762e7b7ed7",
  measurementId: "G-2D7L715K47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();