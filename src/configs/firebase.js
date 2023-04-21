// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAdcazztKfnXlEmyYhlZbxUPG37G5bWf0",
  authDomain: "gymology-c61a3.firebaseapp.com",
  projectId: "gymology-c61a3",
  storageBucket: "gymology-c61a3.appspot.com",
  messagingSenderId: "70283134142",
  appId: "1:70283134142:web:d8b733a451e9531bf24aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app