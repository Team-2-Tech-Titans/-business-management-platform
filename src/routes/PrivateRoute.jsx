import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>; // Optional: Replace with a spinner or loading indicator
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
