import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
}) => {
    const baseStyle = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const sizeStyles = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-md',
        lg: 'px-6 py-3 text-lg',
    };
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    const classes = classNames(
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        { [disabledStyles]: disabled },
        className
    );

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
