import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/user-management/LoginForm';  // Import the LoginForm component

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/dashboard');  // Redirect after successful login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
                <LoginForm onLoginSuccess={handleLoginSuccess} /> {/* Render LoginForm */}
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-indigo-600 hover:text-indigo-800">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;