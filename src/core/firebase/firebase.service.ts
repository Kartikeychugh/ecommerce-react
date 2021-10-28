// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDG7CSQ-GxxyL9yqFjiwYPHOz_LETMFq70",
  authDomain: "ecommerce-baa8f.firebaseapp.com",
  projectId: "ecommerce-baa8f",
  storageBucket: "ecommerce-baa8f.appspot.com",
  messagingSenderId: "267000758131",
  appId: "1:267000758131:web:680638de38e5d396760f06",
  measurementId: "G-PJD341L6LK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();

export const auth = getAuth(app);
// export const database = getFirestore(app);
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleAuthProvider);
};

export const onAuthStateChanged = (callback: (user: User | null) => void) =>
  _onAuthStateChanged(auth, callback);

export const signOut = () => _signOut(auth);

export const firestoreAPI = {
  loginWithGoogle,
  onAuthStateChanged,
  signOut,
};
