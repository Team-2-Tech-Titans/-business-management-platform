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
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    return (
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
    );
};

export default AppRouter;
