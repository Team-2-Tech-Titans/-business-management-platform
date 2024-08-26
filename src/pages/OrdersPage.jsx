import React, { useState, useEffect } from 'react';
import OrderList from '../features/sales-tracking/OrderList';
import OrderDetail from '../features/sales-tracking/OrderDetail';
import { fetchOrders, deleteOrder } from '../services/orderService';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (err) {
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const handleOrderSelect = (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        setSelectedOrder(order);
    };

    const handleOrderDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter((order) => order.id !== orderId));
            setSelectedOrder(null);
        } catch (err) {
            setError('Failed to delete the order.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Orders Management</h1>

            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <OrderList
                            orders={orders}
                            onSelectOrder={handleOrderSelect}
                            onDeleteOrder={handleOrderDelete}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        {selectedOrder ? (
                            <OrderDetail order={selectedOrder} />
                        ) : (
                            <p>Select an order to view details</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
