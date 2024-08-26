import * as Yup from 'yup';

// Validation schema for user login form
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

// Validation schema for user registration form
export const registrationValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

// Validation schema for product form
export const productValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Product name must be at least 2 characters')
        .required('Product name is required'),
    price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than zero')
        .required('Price is required'),
    stock: Yup.number()
        .typeError('Stock must be a number')
        .min(0, 'Stock cannot be negative')
        .required('Stock quantity is required'),
});

// Validation schema for order form
export const orderValidationSchema = Yup.object().shape({
    productId: Yup.string()
        .required('Product is required'),
    quantity: Yup.number()
        .typeError('Quantity must be a number')
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
    customerName: Yup.string()
        .min(2, 'Customer name must be at least 2 characters')
        .required('Customer name is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
});

// Add more validation schemas as needed for other forms in your application
