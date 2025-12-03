import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXXXXXXXXXXXXXXXXX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, firestore, db, googleProvider, push };
export default app;