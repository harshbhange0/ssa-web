import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDmtu6tSdbJqnCH1XsQtzSCQpXJbyfWhC4",
  authDomain: "ssa-web-a8b5e.firebaseapp.com",
  projectId: "ssa-web-a8b5e",
  storageBucket: "ssa-web-a8b5e.appspot.com",
  messagingSenderId: "217211153004",
  appId: "1:217211153004:web:35cf9cabd619505c0d4649",
  measurementId: "G-6VHH74TENX",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

const providerGoogle = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  signInWithPopup(auth, providerGoogle)
    .then((res) => {

      return res;
    })
    .catch((error) => alert(error.message));
};
