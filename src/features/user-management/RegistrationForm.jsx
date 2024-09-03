// src/features/user-management/RegistrationForm.jsx

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField';
import { registerUser } from '../../services/authService';
import { useUser } from '../../context/UserContext';

const RegistrationForm = ({ onRegisterSuccess }) => {
    const { setUser } = useUser();
    const [registerError, setRegisterError] = useState('');

    // Update validation schema to include confirm password field
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleRegister = async (values, { setSubmitting }) => {
        setRegisterError('');
        try {
            const { name, email, password } = values;
            const userData = await registerUser({ name, email, password }); // Call registerUser from authService
            setUser(userData); // Save user data in context
            onRegisterSuccess(); // Call the success handler
        } catch (error) {
            console.error('Registration error:', error);
            setRegisterError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {registerError && (
                <div className="mb-4 text-red-600 text-center">
                    {registerError}
                </div>
            )}

            <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
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
                            placeholder="Confirm your password"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                        >
                            {isSubmitting ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegistrationForm;
