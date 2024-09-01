import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserDetailsApi } from './Api';
// Create the AuthContext
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        console.log(authStatus);
        if (authStatus === 'true') {
          setIsAuthenticated(true);
           getUserDetailsApi().then((res) => {
            setUser(res.data);
          }).catch((err) => console.log(err))
          }
        setLoading(false);
      }, []);
    // const [sessionId, setSessionId] = useState(null);

    // Method to log in and set session ID
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    // Method to log out
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated', 'true');
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout , loading}}>
            {children}
        </AuthContext.Provider>
    );
};

