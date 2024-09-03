/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, logoutUser } from '../services/authService';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const setUser = (userData) => {
        setUserState(userData);
        if (userData) {
            try {
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (storageError) {
                console.error('Error saving user data to localStorage:', storageError);
            }
        } else {
            localStorage.removeItem('user');
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const userData = await loginUser(credentials);
            setUser(userData);
        } catch (err) {
            console.error('Failed to log in:', err.message);
            setError('Failed to log in.');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (err) {
            setError('Failed to log out.');
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loading,
                error,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
