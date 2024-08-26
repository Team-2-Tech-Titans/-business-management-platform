import React from 'react';

const DashboardMetrics = ({ title, value, icon }) => {
    return (
        <div className="bg-white p-6 shadow rounded-lg flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            {icon && (
                <div className="text-gray-400">
                    {icon}
                </div>
            )}
        </div>
    );
};

export default DashboardMetrics;
