import { createContext, useState } from 'react';
import { useEffect } from "react";

export const AuthContext = createContext();


// AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  console.log("여기있다");
  
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    console.log("context", storedIsLoggedIn, storedUser);
    console.log("여기있다 use effect");
    if (storedIsLoggedIn && storedUser) {
      try {
        // storedUser가 null 또는 undefined인지 확인
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
          console.log(parsedUser);
          setIsLoggedIn(true);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
