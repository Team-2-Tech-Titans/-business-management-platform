import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../features/user-management/RegistrationForm';  // Import RegistrationForm

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        navigate('/login');  // Redirect to login after successful registration
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
                <RegistrationForm onRegisterSuccess={handleRegisterSuccess} /> {/* Render RegistrationForm */}
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;