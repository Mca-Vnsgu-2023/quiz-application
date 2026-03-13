import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const signup = (data) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      ...data,
      role: "user"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = (email, password) => {

    if (email === "admin@gmail.com" && password === "admin@123") {

      const adminUser = {
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin"
      };

      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));

      return adminUser;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      return foundUser;
    }

    return null;
  };

  const logout = () => {

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);