import { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Load user from localStorage (so user stays logged in)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined" || savedUser === "null") {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      return null;
    }
  });

  // Login function
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};