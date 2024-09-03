import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, logoutUser, fetchUserProfile, updateUserProfile } from '../services/authService';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const profileData = await fetchUserProfile();
                setUser(profileData);
            } catch (err) {
                setError('Failed to load user profile.');
                setUser(null); // Ensure user is set to null on error
            } finally {
                setLoading(false);
            }
        };
        loadUserProfile();
    }, []);

    const login = async (credentials) => {
        setLoading(true); // Start loading state for login
        try {
            const userData = await loginUser(credentials);
            setUser(userData);
        } catch (err) {
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

    const updateUser = async (updatedData) => {
        try {
            const updatedUser = await updateUserProfile(updatedData);
            setUser(updatedUser);
        } catch (err) {
            setError('Failed to update user profile.');
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
