import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCwocweAd9_Gf4MDtp9A1TXuSjhhNdX7Y4",
  authDomain: "maltimart-4f96f.firebaseapp.com",
  projectId: "maltimart-4f96f",
  storageBucket: "maltimart-4f96f.appspot.com",
  messagingSenderId: "160633434674",
  appId: "1:160633434674:web:aab6381e0be2554451c22b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app