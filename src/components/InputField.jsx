import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const InputField = ({ label, type = 'text', placeholder = '', className = '', disabled = false, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={props.id || props.name}
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`mt-1 block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${disabled ? 'bg-gray-100' : ''}`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'textarea']),
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputField;
