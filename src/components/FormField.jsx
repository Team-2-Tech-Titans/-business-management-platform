import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const FormField = ({ label, type = 'text', placeholder, name, className = '' }) => {
    const [field, meta] = useField(name);

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                {...field}
                type={type}
                placeholder={placeholder}
                className={`mt-1 block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'textarea']),
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default FormField;
