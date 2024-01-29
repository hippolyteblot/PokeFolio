import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(1);

    const login = async (username, password) => {
        try {
            // Request to the backend to create an account
            const response = await fetch('http://127.0.0.1:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // If the request was successful, set the token in local storage
                setLoggedIn(true);
                const data = await response.json();
                setUserId(data.id);
                console.log("Logged in successfully with user id: ", data.id);
            } else {
                // If the request was unsuccessful, display the error
                console.error('Error:', response);
                throw new Error('Error logging in.');
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Error logging in.');
        }
    };

    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
