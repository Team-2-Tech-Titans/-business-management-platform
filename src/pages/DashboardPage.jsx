import React from 'react';
import DashboardMetrics from '../features/dashboard/DashboardMetrics';
import ChartComponent from '../components/ChartComponent';

const DashboardPage = () => {
    const salesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [12000, 15000, 18000, 20000, 24000, 21000, 25000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
    const ordersData = {
        labels: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        datasets: [
            {
                data: [120, 90, 230, 40],
                backgroundColor: [
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const salesOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Over Time',
            },
        },
    };
    const ordersOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Order Status Distribution',
            },
        },
    };
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <DashboardMetrics />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Sales Overview</h2>
                <div className="h-96">
                    <ChartComponent type="line" data={salesData} options={salesOptions} />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Order Distribution</h2>
                <div className="h-96">
                    <ChartComponent type="pie" data={ordersData} options={ordersOptions} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
