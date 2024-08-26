import React from 'react';
import DashboardMetrics from './DashboardMetrics';
import useProducts from '../../hooks/useProducts';
import useOrders from '../../hooks/useOrders';
import useFinancialData from '../../hooks/useFinancialData';

const Dashboard = () => {
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { orders, loading: ordersLoading, error: ordersError } = useOrders();
    const { financialData, loading: financialLoading, error: financialError } = useFinancialData('transactions');

    if (productsLoading || ordersLoading || financialLoading) return <p>Loading dashboard...</p>;
    if (productsError || ordersError || financialError) return <p>Error loading dashboard data.</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardMetrics title="Total Products" value={products.length} />
                <DashboardMetrics title="Total Orders" value={orders.length} />
                <DashboardMetrics title="Total Revenue" value={`$${financialData.reduce((sum, txn) => sum + (txn.type === 'credit' ? txn.amount : 0), 0).toFixed(2)}`} />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
                <ul>
                    {orders.slice(0, 5).map((order) => (
                        <li key={order.id} className="mb-2">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Total:</strong> ${order.total}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Financial Overview</h2>
                <ul>
                    {financialData.slice(0, 5).map((txn) => (
                        <li key={txn.id} className="mb-2">
                            <p><strong>Transaction ID:</strong> {txn.id}</p>
                            <p><strong>Type:</strong> {txn.type}</p>
                            <p><strong>Amount:</strong> ${txn.amount}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
