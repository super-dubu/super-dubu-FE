import { createContext, useState } from "react";
import { useEffect } from "react";
export const AuthContext = createContext();
import Swal from "sweetalert2";

// AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "확인",
    });
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");
    if (storedIsLoggedIn && storedUser) {
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
          setIsLoggedIn(true);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
    }
  }, []);

  const login = async (userData) => {
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

  const getUser = () => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("user");
    if (storedIsLoggedIn && storedUser) {
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
          setIsLoggedIn(true);
          setUser(parsedUser);
        }
      } catch (error) {
        showAlert("데이터 파싱 실패", "데이터를 파싱하는데 실패하였습니다.", "error");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};
