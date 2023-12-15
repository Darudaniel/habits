import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const logout = async () => {
  await signOut(auth)
  localStorage.setItem("name", "No users")
  localStorage.setItem("email", undefined)
  console.log("Sesion cerrada")
}


export const signWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    
    const user = result.user;
    const name = user.displayName
    const email = user.email

    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    // ...
  }).catch((error) => {
    
    console.error(error)
  });
}


export default db