import React from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import OrderDelete from './OrderDelete';

const OrderList = () => {
    const { orders, loading, error } = useOrders();

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>
            <Link
                to="/orders/new"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
            >
                Create New Order
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-4 shadow rounded-lg">
                        {console.log(order)}
                        <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
                        <p className="text-gray-700 mb-2">Customer: {order.customerName}</p>
                        <p className="text-gray-700 mb-2">Status: {order.status}</p>
                        <p className="text-gray-700 mb-4">Total: ${order.items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0).toFixed(2)}</p>
                        <div className="flex justify-between items-center">
                            <Link
                                to={`/orders/${order.id}`}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                            >
                                View
                            </Link>
                            <Link
                                to={`/orders/${order.id}/edit`}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                            >
                                Edit
                            </Link>
                            <OrderDelete orderId={order.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
