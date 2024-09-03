import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { loginUser } from '../services/authService';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext
    const [loginError, setLoginError] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleLogin = async (values, { setSubmitting }) => {
        setLoginError(''); // Clear any previous errors
        try {
            const userData = await loginUser(values); // Call the loginUser function from authService
            setUser(userData); // Save user data in context
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Login error:', error);
            setLoginError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

                {loginError && (
                    <div className="mb-4 text-red-600 text-center">
                        {loginError}
                    </div>
                )}

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>

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
