import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <AuthContext.Provider value={{ isConnected, setIsConnected }}>
            {children}
        </AuthContext.Provider>
    );
};

// Créez un hook pour utiliser le contexte facilement
export const useAuth = () => {
    return useContext(AuthContext);
};