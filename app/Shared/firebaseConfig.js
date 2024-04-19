// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAelnjkdcl6NdMTuLV4OYzZBhMFlOJpIU8",
  authDomain: "clone2-7ee7c.firebaseapp.com",
  projectId: "clone2-7ee7c",
  storageBucket: "clone2-7ee7c.appspot.com",
  messagingSenderId: "948612578086",
  appId: "1:948612578086:web:14863a29e45eed0fb45fe7",
  measurementId: "G-6PJQB2W4JR"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 
export default app;