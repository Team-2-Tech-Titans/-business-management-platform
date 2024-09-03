import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import OrderDetail from './OrderDetail';

const OrderManagement = () => {
    return (
        <div className="p-6">
            <Routes>
                <Route path="/" element={<OrderList />} />
                <Route path="/new" element={<OrderForm />} />
                <Route path="/:orderId" element={<OrderDetail />} />
                <Route path="/:orderId/edit" element={<OrderForm />} />
            </Routes>
        </div>
    );
};

export default OrderManagement;
