import React from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const chartTypes = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    pie: Pie,
};

const ChartComponent = ({ type, data, options, className = '' }) => {
    const ChartType = chartTypes[type] || Line;

    return (
        <div className={className}>
            <ChartType data={data} options={options} />
        </div>
    );
};

ChartComponent.propTypes = {
    type: PropTypes.oneOf(['line', 'bar', 'doughnut', 'pie']).isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    className: PropTypes.string,
};

ChartComponent.defaultProps = {
    options: {},
    className: '',
};

export default ChartComponent;
