import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD4HLeAWJ-6ftGsLHR5q6iJ4AZ5x4R4lLk",
  authDomain: "linkedin-clone-51fd7.firebaseapp.com",
  projectId: "linkedin-clone-51fd7",
  storageBucket: "linkedin-clone-51fd7.firebasestorage.app",
  messagingSenderId: "898404121959",
  appId: "1:898404121959:web:dc36e3758b28bc5d8a43c2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)