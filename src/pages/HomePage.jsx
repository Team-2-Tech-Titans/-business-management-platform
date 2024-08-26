import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="p-6">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-center">Welcome to Your Business Management Platform</h1>
                <p className="mt-4 text-xl text-center text-gray-600">
                    Manage all aspects of your business in one place.
                </p>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                    <p className="text-gray-600 mb-4">
                        Manage user registrations, profiles, and authentication seamlessly.
                    </p>
                    <Link
                        to="/user-management"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Manage Users
                    </Link>
                </div>
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Product Inventory</h2>
                    <p className="text-gray-600 mb-4">
                        Keep track of your product inventory with powerful management tools.
                    </p>
                    <Link
                        to="/products"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        View Products
                    </Link>
                </div>
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Sales Tracking</h2>
                    <p className="text-gray-600 mb-4">
                        Track and manage your sales orders with detailed insights.
                    </p>
                    <Link
                        to="/orders"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Track Sales
                    </Link>
                </div>
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Financial Reporting</h2>
                    <p className="text-gray-600 mb-4">
                        Generate and view comprehensive financial reports with ease.
                    </p>
                    <Link
                        to="/financial-reports"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        View Reports
                    </Link>
                </div>
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                    <p className="text-gray-600 mb-4">
                        Get an overview of your business metrics and insights on the dashboard.
                    </p>
                    <Link
                        to="/dashboard"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Go to Dashboard
                    </Link>
                </div>
                <div className="p-6 bg-white shadow rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                    <p className="text-gray-600 mb-4">
                        Manage your personal profile and account settings.
                    </p>
                    <Link
                        to="/profile"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        View Profile
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
