import React from 'react';
import DataVisualization from '../features/financial-reporting/DataVisualization';
import ReportGenerator from '../features/financial-reporting/ReportGenerator';
import Reconciliation from '../features/financial-reporting/Reconciliation';

const FinancialReportsPage = () => {
    // Example data for financial visualizations
    const revenueData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Revenue',
                data: [50000, 75000, 60000, 90000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const expensesData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Expenses',
                data: [30000, 45000, 40000, 50000],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quarterly Financial Overview',
            },
        },
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Financial Reports</h1>

            {/* Data Visualization Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Revenue and Expenses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-96">
                        <DataVisualization type="bar" data={revenueData} options={chartOptions} />
                    </div>
                    <div className="h-96">
                        <DataVisualization type="bar" data={expensesData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Reconciliation Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Reconciliation</h2>
                <Reconciliation />
            </div>

            {/* Report Generation Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Generate Reports</h2>
                <ReportGenerator />
            </div>
        </div>
    );
};

export default FinancialReportsPage;
