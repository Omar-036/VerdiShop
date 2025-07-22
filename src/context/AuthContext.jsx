import React, { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { clearCart } = useCart();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      const defaultUsers = [
        {
          id: 1,
          username: "Omar Alhaj",
          email: "john@example.com",
          password: "123456",
        },
        {
          id: 2,
          username: "Yazan Alhaj",
          email: "jane@example.com",
          password: "abcdef",
        },
        {
          id: 3,
          username: "Essam Alhaj",
          email: "mike@example.com",
          password: "password",
        },
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    clearCart();
  };

  const signup = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      username,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);

    return true;
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    logout,
    signup,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
