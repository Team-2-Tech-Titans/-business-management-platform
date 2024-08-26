import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

const LoginPage = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleLogin = (values) => {
        // Example: Replace this with your actual login logic
        console.log('Login values:', values);
        // Simulate successful login and redirect to the dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>

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
