import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import OrderDetail from './OrderDetail';

const OrderManagement = () => {
    return (
        <div className="p-6">
            <Routes>
                {/* Default route for /orders/ */}
                <Route path="/" element={<OrderList />} />

                {/* For /orders/new */}
                <Route path="new" element={<OrderForm />} />

                {/* For /orders/:orderId */}
                <Route path=":orderId" element={<OrderDetail />} />

                {/* For /orders/:orderId/edit */}
                <Route path=":orderId/edit" element={<OrderForm />} />
            </Routes>
        </div>
    );
};

export default OrderManagement;
