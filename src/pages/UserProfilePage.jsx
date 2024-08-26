import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { updateUserProfile, fetchUserProfile } from '../services/authService';

const UserProfilePage = () => {
    const [initialValues, setInitialValues] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState('');

    React.useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const profileData = await fetchUserProfile();
                setInitialValues({
                    name: profileData.name,
                    email: profileData.email,
                    password: '',
                    confirmPassword: '',
                });
            } catch (err) {
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateUserProfile({
                name: values.name,
                email: values.email,
                ...(values.password && { password: values.password }),
            });
            setSuccessMessage('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>

            {loading ? (
                <p>Loading profile...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {successMessage && (
                                <div className="text-green-500 mb-4">{successMessage}</div>
                            )}
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
                                placeholder="Enter a new password"
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default UserProfilePage;
