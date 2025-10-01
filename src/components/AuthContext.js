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
        const user = JSON.parse(localStorage.getItem('userDetails'));




        if (authStatus === 'true') {
            setIsAuthenticated(true);
            setUser(user);
        }
        setLoading(false);
    }, []);
    // const [sessionId, setSessionId] = useState(null);

    // Method to log in and set session ID
    const login = () => {
        return new Promise(async (resolve, reject) => {
            try {
                var userdetails = await getUserDetailsApi();


                setUser(userdetails.data);
                setIsAuthenticated(true);
                localStorage.setItem('userDetails', JSON.stringify(userdetails.data));
                localStorage.setItem('isAuthenticated', 'true');
                resolve(); // Resolve the promise on success
            } catch (error) {
                reject(error); // Reject the promise on error
            }
        });
    };


    // Method to log out
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated', 'true');
        localStorage.removeItem('userDetails', user);

    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

