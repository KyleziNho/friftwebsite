import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFl_9iLCTqvxdRD3oeTxThSqiFh3_Lz50",
  authDomain: "campus-connect-c56a9.firebaseapp.com",
  projectId: "campus-connect-c56a9",
  storageBucket: "campus-connect-c56a9.appspot.com",
  messagingSenderId: "43653639488",
  appId: "1:43653639488:web:your_web_app_id_here"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);