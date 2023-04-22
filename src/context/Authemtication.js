import React, { useState, useEffect } from "react";
import storage from "./storage";
import { getAuth, onAuthStateChanged,signOut } from 'firebase/auth';
import app from "../configs/firebase";
import { async } from "@firebase/util";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const auth=getAuth(app)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const user = await storage.getItem("gymology");
        if (user) {
          setUser(user);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (user) => {
    try {
      await storage.setItem("gymology", user);
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth)
      await storage.removeItem("gymology");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};