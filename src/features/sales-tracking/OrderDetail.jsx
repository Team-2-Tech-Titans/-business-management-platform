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
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-10 lg:p-12">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Order Details</h1>

                <div className="border-b pb-4 mb-6">
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-indigo-500">Order ID:</strong> {order.id}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-indigo-500">Customer Name:</strong> {order.customerName}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-indigo-500">Email:</strong> {order.customerEmail}
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong className="text-indigo-500">Status:</strong>
                        <span className={`ml-2 px-3 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-200 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                    'bg-red-200 text-red-800'
                            }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Items Ordered</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item, index) => (
                            <li key={index} className="bg-gray-50 shadow-md p-4 rounded-lg">
                                <p className="text-lg font-semibold text-gray-800"><strong>Product:</strong> {item.productName}</p>
                                <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
                                <p className="text-gray-700"><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                                <p className="text-gray-800 font-semibold"><strong>Total:</strong> ${(item.quantity * item.price).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 border-t pt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Order Summary</h3>
                    <div className="flex flex-col md:flex-row justify-between">
                        <p className="text-lg text-gray-700 mb-2 md:mb-0">
                            <strong>Total Items:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </p>
                        <p className="text-lg text-gray-700">
                            <strong>Total Price:</strong> ${order.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
