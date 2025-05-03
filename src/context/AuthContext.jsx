import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage('authUser', null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    removeUser();
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedFields,
    }));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
