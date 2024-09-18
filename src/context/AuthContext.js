// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the context
// const AuthContext = createContext();

// // Create a custom hook to access the AuthContext
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // Provider component
// export const AuthProvider = ({ children, email, token }) => {
//     const [authEmail, setAuthEmail] = useState(null);
//     const [authToken, setAuthToken] = useState(null);

//     useEffect(() => {
//         if (email && token) {
//             setAuthEmail(email);
//             setAuthToken(token);
//         }
//     }, [email, token]);

//     return (
//         <AuthContext.Provider value={{ email: authEmail, token: authToken }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
