import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-f6b29.firebaseapp.com",
  projectId: "eshop-f6b29",
  storageBucket: "eshop-f6b29.appspot.com",
  messagingSenderId: "255638382359",
  appId: "1:255638382359:web:3dfc4c6195fcd986bf7952"
};

//initialize firebase
const app = initializeApp(firebaseConfig);

export const auth   = getAuth(app);
export const db     = getFirestore(app);
export const storage= getStorage(app);

export default app;