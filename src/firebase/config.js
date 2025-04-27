import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCq2Y1ij6dXOtdHwhlqVfhYbeAGmqd0bIw",
    authDomain: "task-manager-b9050.firebaseapp.com",
    projectId: "task-manager-b9050",
    storageBucket: "task-manager-b9050.firebasestorage.app",
    messagingSenderId: "202964173327",
    appId: "1:202964173327:web:ee50335a4bd4afd1c5d97a"
  };  

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
