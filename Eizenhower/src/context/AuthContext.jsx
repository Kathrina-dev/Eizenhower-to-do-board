import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      setUserID(parseInt(storedID));
    }
  }, []);

  const login = (id) => {
    setUserID(id);
    localStorage.setItem("userID", id);
  };

  const logout = () => {
    setUserID(null);
    localStorage.removeItem("userID");
  };

  return (
    <AuthContext.Provider value={{ userID, setUserID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
