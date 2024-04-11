import axios from "axios";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
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
// localhost:3000/api/v1/user/sign-in
export const SignInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);
    const { email, displayName, photoURL } = res.user;
    if (!res.user) {
      return;
    }
    const data = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/sign-in`,
      {
        email,
        name: displayName,
        image: photoURL,
      },
    );
    toast.success(data.data?.msg);
    localStorage.setItem("id", data?.data.data!);
    localStorage.setItem("authorization", data?.data.token!);
    localStorage.setItem("userType", "User");
  } catch (error) {
    toast.error("Error in Sign In/Up");
    console.log(error);
  }
};
