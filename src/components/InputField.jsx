import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
    label,
    type = 'text',
    placeholder = '',
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    className = '',
    disabled = false,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`mt-1 block w-full px-3 py-2 border ${touched && error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${disabled ? 'bg-gray-100' : ''
                    }`}
            />
            {touched && error ? (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            ) : null}
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'textarea']),
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    touched: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputField;
