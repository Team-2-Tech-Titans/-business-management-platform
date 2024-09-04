import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import OrdersPage from '../pages/OrdersPage';
import UserProfilePage from '../pages/UserProfilePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import FinancialReportsPage from '../pages/FinancialReportsPage';
import UserManagementPage from '../pages/UserManagementPage';
import RegisterPage from '../pages/RegisterPage';  // Import the Register Page
import ProductForm from '../features/product-inventory/ProductForm'; // Import ProductForm
import ProductEdit from '../features/product-inventory/ProductEdit'; // Import ProductEdit
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';

const AppRouter = () => {
    const { user } = useUser(); // Check if the user is logged in

    return (
        <>
            {user && <Navbar />} {/* Render Navbar only if the user is logged in */}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />  {/* Add the Register Route */}

                {/* Private Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <ProductsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/new"
                    element={
                        <PrivateRoute>
                            <ProductForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/edit/:id"
                    element={
                        <PrivateRoute>
                            <ProductEdit />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <OrdersPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <UserProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/financial-reports"
                    element={
                        <PrivateRoute>
                            <FinancialReportsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/user-management"
                    element={
                        <PrivateRoute>
                            <UserManagementPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRouter;
