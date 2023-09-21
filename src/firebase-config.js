import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyB2HuD4h9bq4waBx2YhzVCXolua6u3m3yA",
  authDomain: "inventory-a0c10.firebaseapp.com",
  projectId: "inventory-a0c10",
  storageBucket: "inventory-a0c10.appspot.com",
  messagingSenderId: "352734973642",
  appId: "1:352734973642:web:7970d77724920b443c2e33",
  measurementId: "G-89WHTNPBWM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
  })
  .catch((error) => {
    console.error('Persistence error:', error);
  });

export const db = getFirestore(app);