import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdpwUt-haEhVZG49KZI33t2kNiSU2frGw",
  authDomain: "gt-backend-d81a5.firebaseapp.com",
  projectId: "gt-backend-d81a5",
  storageBucket: "gt-backend-d81a5.firebasestorage.app",
  messagingSenderId: "1058825496117",
  appId: "1:1058825496117:web:3512fb5ef523416722337c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
