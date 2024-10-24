import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children,  token }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        if (token) {
            setAuthToken(token);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token: authToken }}>
            {children}
        </AuthContext.Provider>
    );
};
