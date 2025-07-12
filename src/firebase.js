import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "chat-app-dfe82",
  storageBucket: "chat-app-dfe82.appspot.com",
  messagingSenderId: "943551675512",
  appId: "1:943551675512:web:cf89b77f95ef47cb25418d"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
