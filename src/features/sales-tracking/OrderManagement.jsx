import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import OrderDetail from './OrderDetail';

const OrderManagement = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>

            <Routes>
                <Route path="/" element={<OrderList />} />
                <Route path="/new" element={<OrderForm />} />
                <Route path="/:orderId" element={<OrderDetail />} />
                <Route path="/:orderId/edit" element={<OrderForm />} />
            </Routes>

            <div className="mt-6">
                <Link
                    to="/orders/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create New Order
                </Link>
            </div>
        </div>
    );
};

export default OrderManagement;
