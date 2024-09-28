import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const registerWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmailAndPassowrd = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogleAccount = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return result;
};

export const logoutUser = () => {
  return auth.signOut();
};
