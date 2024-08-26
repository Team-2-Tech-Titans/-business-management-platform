import { useState, useEffect } from 'react';
import {
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
} from '../services/orderService';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const handleAddOrder = async (orderData) => {
        try {
            const newOrder = await addOrder(orderData);
            setOrders((prevOrders) => [...prevOrders, newOrder]);
        } catch (err) {
            setError('Failed to add order: ' + err.message);
        }
    };

    const handleUpdateOrder = async (orderId, updatedData) => {
        try {
            const updatedOrder = await updateOrder(orderId, updatedData);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? updatedOrder : order
                )
            );
        } catch (err) {
            setError('Failed to update order: ' + err.message);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.id !== orderId)
            );
        } catch (err) {
            setError('Failed to delete order: ' + err.message);
        }
    };

    return {
        orders,
        loading,
        error,
        handleAddOrder,
        handleUpdateOrder,
        handleDeleteOrder,
    };
};

export default useOrders;
