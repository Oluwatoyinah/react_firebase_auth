import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("user_auth")) || {};
  });

  const [actionStatus, setActionStatus] = useState({
    isLoggedIn: false,
    isLoading: true,
  });

  const { isLoading, isLoggedIn } = actionStatus;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUserFn);
    return unsubscribe;
  }, []);

  async function initializeUserFn(user) {
    if (user) {
      // if there is a logged in user
      setAuth({ ...user });
      setActionStatus({ ...actionStatus, isLoggedIn: true });
    } else {
      setAuth({});
      setActionStatus({ ...actionStatus, isLoggedIn: false });
    }

    setActionStatus({ ...actionStatus, isLoading: false });
  }

  useEffect(() => {
    localStorage.setItem("user_auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, isLoading, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
