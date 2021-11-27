import { createContext, useState } from 'react';

// Create context
const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Context provider component
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token', token);
  };

  const context = { isAuthenticated, token, login, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider };

export default AuthContext;
