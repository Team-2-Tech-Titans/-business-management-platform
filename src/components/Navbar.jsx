import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { logout } = useUser();

    return (
        <nav className="bg-indigo-600 text-white mb-2">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/dashboard">Business Management</Link>
                </div>
                <div className="space-x-4 flex items-center">
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link to="/products" className="hover:underline">Products</Link>
                    <Link to="/orders" className="hover:underline">Orders</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
