// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d3ef0.firebaseapp.com",
  projectId: "mern-blog-d3ef0",
  storageBucket: "mern-blog-d3ef0.appspot.com",
  messagingSenderId: "565695771899",
  appId: "1:565695771899:web:f64255b093b005f2bb6c5e",
  measurementId: "G-1BMC6CYY7G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
