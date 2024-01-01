import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRkHcQuGT5P0GgZcBEtRU_kzl51YejNDM",
  authDomain: "linkedin-clone-486a0.firebaseapp.com",
  projectId: "linkedin-clone-486a0",
  storageBucket: "linkedin-clone-486a0.appspot.com",
  messagingSenderId: "19372388810",
  appId: "1:19372388810:web:4f157569940a3d0bb05f33",
};

//initialize app
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { auth, firebaseApp, firestore, storage };
