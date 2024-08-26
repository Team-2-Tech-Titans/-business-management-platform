import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';

const OrderDetail = () => {
    const { orderId } = useParams(); // Assuming you are using React Router
    const { orders, loading, error } = useOrders();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const foundOrder = orders.find((o) => o.id === orderId);
        setOrder(foundOrder);
    }, [orderId, orders]);

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!order) return <p>Order not found</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Order Details</h1>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Order ID:</strong> {order.id}
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Customer Name:</strong> {order.customerName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Email:</strong> {order.customerEmail}
            </p>
            <p className="text-lg text-gray-700 mb-4">
                <strong>Status:</strong> {order.status}
            </p>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Items Ordered:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {order.items.map((item, index) => (
                        <li key={index} className="mb-2">
                            <p><strong>Product:</strong> {item.productName}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                            <p><strong>Total:</strong> ${(item.quantity * item.price).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Order Summary:</h3>
                <p className="text-lg text-gray-700">
                    <strong>Total Items:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-lg text-gray-700">
                    <strong>Total Price:</strong> ${order.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default OrderDetail;
