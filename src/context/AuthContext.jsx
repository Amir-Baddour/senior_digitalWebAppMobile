import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { makeClient } from "../../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  // boot from storage
  useEffect(() => {
    const t = localStorage.getItem("jwt");
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");
    if (t) setJwt(t);
    if (id || email) setUser({ id, email, role });
  }, []);

  const client = useMemo(() => makeClient(jwt), [jwt]);

  const signIn = (token, userObj) => {
    setJwt(token);
    setUser(userObj);
    localStorage.setItem("jwt", token);
    localStorage.setItem("userId", userObj?.id ?? "");
    localStorage.setItem("userEmail", userObj?.email ?? "");
    localStorage.setItem("userRole", userObj?.role ?? "");
  };

  const signOut = () => {
    setJwt(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ jwt, user, client, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
