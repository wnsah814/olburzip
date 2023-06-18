import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvoT0g78CpfC93lVoHOJa-PxHkw_XuK78",
    authDomain: "urbur-5e34d.firebaseapp.com",
    projectId: "urbur-5e34d",
    storageBucket: "urbur-5e34d.appspot.com",
    messagingSenderId: "114595019946",
    appId: "1:114595019946:web:d02c8558d648cfcefba4d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
