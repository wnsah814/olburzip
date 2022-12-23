import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

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
export const storage = getStorage(app);
