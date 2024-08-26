import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchOrders, addOrder, updateOrder, deleteOrder } from '../services/orderService';

const OrderContext = createContext();

export const useOrders = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
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

    const addNewOrder = async (orderData) => {
        try {
            const newOrder = await addOrder(orderData);
            setOrders((prevOrders) => [...prevOrders, newOrder]);
        } catch (err) {
            setError('Failed to add the order.');
        }
    };

    const updateExistingOrder = async (orderId, updatedData) => {
        try {
            const updatedOrder = await updateOrder(orderId, updatedData);
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
            );
        } catch (err) {
            setError('Failed to update the order.');
        }
    };

    const deleteExistingOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (err) {
            setError('Failed to delete the order.');
        }
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                error,
                addNewOrder,
                updateExistingOrder,
                deleteExistingOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
