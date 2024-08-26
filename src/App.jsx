import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store if using Redux

import AppRouter from './routes/AppRouter';
import PrivateRoute from './routes/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import FinancialReportsPage from './pages/FinancialReportsPage';
import UserProfilePage from './pages/UserProfilePage';

import './styles/globals.css'; // Import global styles including TailwindCSS

const App = () => {
  return (
    <Provider store={store}> {/* Wrap the app in Provider if using Redux */}
      <Router>
        <AppRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
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
              path="/financial-reports"
              element={
                <PrivateRoute>
                  <FinancialReportsPage />
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
          </Routes>
        </AppRouter>
      </Router>
    </Provider>
  );
};

export default App;
