import React, { useState } from 'react';
import useFinancialData from '../../hooks/useFinancialData';

const ReportGenerator = () => {
    const { financialData, loading, error, handleGenerateCSV, handleGeneratePDF } = useFinancialData('transactions');
    const [reportType, setReportType] = useState('csv');

    const handleGenerateReport = () => {
        if (reportType === 'csv') {
            handleGenerateCSV('financial_report.csv');
        } else if (reportType === 'pdf') {
            handleGeneratePDF('financial_report.pdf', 'Financial Report');
        }
    };

    if (loading) return <p>Loading financial data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Generate Financial Report</h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportType">
                    Select Report Format:
                </label>
                <select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                </select>
            </div>

            <button
                onClick={handleGenerateReport}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Generate Report
            </button>
        </div>
    );
};

export default ReportGenerator;
