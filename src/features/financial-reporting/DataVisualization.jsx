import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DataVisualization = ({ type = 'line', data, options, title }) => {
    const chartConfig = {
        labels: data.labels,
        datasets: data.datasets,
    };

    const renderChart = () => {
        switch (type) {
            case 'line':
                return <Line data={chartConfig} options={options} />;
            case 'bar':
                return <Bar data={chartConfig} options={options} />;
            case 'doughnut':
                return <Doughnut data={chartConfig} options={options} />;
            default:
                return <Line data={chartConfig} options={options} />;
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            {renderChart()}
        </div>
    );
};

export default DataVisualization;
