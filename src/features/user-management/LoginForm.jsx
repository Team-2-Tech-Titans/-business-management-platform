import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField';
import { loginUser } from '../../services/authService';
import { useUser } from '../../context/UserContext';

const LoginForm = ({ onLoginSuccess }) => {
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
            onLoginSuccess(); // Call the success handler
        } catch (error) {
            console.error('Login error:', error);
            setLoginError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
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
        </>
    );
};

export default LoginForm;