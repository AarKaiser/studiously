import { createContext, useState } from 'react';
// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// Create context
const AuthContext = createContext({
  token: null,
  loggedIn: () => {},
  getProfile: () => {},
  getToken: () => {},
  isTokenExpired: () => {},
  login: () => {},
  logout: () => {},
});

// Context provider component
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('id_token', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('id_token', token);
  };

  // Get token
  const getToken = () => localStorage.getItem('id_token');

  const loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken();
    const authenticated = !!token && !isTokenExpired(token); // handwaiving here

    if (authenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  // get user data
  const getProfile = () => {
    return decode(getToken());
  };

  function isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  const context = {
    isAuthenticated,
    token,
    login,
    logout,
    loggedIn,
    getProfile,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider };

export default AuthContext;
