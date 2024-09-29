import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSJnsQKkwyMyarj6-oPRi7-Ba1OwdMFdg",
  authDomain: "chatstranger-bb23f.firebaseapp.com",
  databaseURL: "https://chatstranger-bb23f-default-rtdb.firebaseio.com",
  projectId: "chatstranger-bb23f",
  storageBucket: "chatstranger-bb23f.appspot.com",
  messagingSenderId: "239430056287",
  appId: "1:239430056287:web:e7aa9aeac446ae2093deea",
  measurementId: "G-NRS89K1Y94",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const rtdb = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, rtdb, storage };
