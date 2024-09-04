import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const DataVisualization = ({ type = 'line', data, options, title }) => {
    const renderChart = () => {
        switch (type) {
            case 'bar':
                return <Bar data={data} options={options} />;
            case 'doughnut':
                return <Doughnut data={data} options={options} />;
            default:
                return <Line data={data} options={options} />;
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
            {renderChart()}
        </div>
    );
};

export default DataVisualization;
