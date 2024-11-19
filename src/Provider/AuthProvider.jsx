/* eslint-disable no-unused-vars */

/* eslint-disable react-refresh/only-export-components */

/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../components/firebase/firebase.config";
import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  // const AuthInfo = {
  //   name: "Nasim Hossain Robin",
  //   email: "robin@example.com",
  // };
  const [user, setUser] = useState(null);
  const createnewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const createLoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const mainAuthInfo = {
    user,
    setUser,
    createnewUser,
    createLoginUser,
    // AuthInfo, // Uncomment this line if you want to use AuthInfo object in your app.
  };
  return (
    <AuthContext.Provider value={mainAuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
