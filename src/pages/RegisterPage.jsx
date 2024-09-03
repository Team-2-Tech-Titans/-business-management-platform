import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { registerUser } from '../services/authService';
import { useUser } from '../context/UserContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [registrationError, setRegistrationError] = useState('');

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleRegister = async (values, { setSubmitting }) => {
        setRegistrationError(''); // Reset any previous errors
        try {
            const { name, email, password } = values;
            const user = await registerUser({ name, email, password });
            setUser(user);
            // Navigate to dashboard after successful registration
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create a New Account</h1>

                {registrationError && (
                    <div className="mb-4 text-red-600 text-center">
                        {registrationError}
                    </div>
                )}

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                            />
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
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
