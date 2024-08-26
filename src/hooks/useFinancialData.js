import { useState, useEffect } from 'react';
import {
    fetchFinancialData,
    generateCSVReport,
    generatePDFReport,
    reconcileTransactions,
} from '../services/financialService';

const useFinancialData = (collectionName, filters = {}) => {
    const [financialData, setFinancialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFinancialData = async () => {
            setLoading(true);
            try {
                const data = await fetchFinancialData(collectionName, filters);
                setFinancialData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadFinancialData();
    }, [collectionName, filters]);
    const handleGenerateCSV = (fileName = 'financial_report.csv') => {
        try {
            generateCSVReport(financialData, fileName);
        } catch (err) {
            setError('Failed to generate CSV report: ' + err.message);
        }
    };
    const handleGeneratePDF = (fileName = 'financial_report.pdf', title = 'Financial Report') => {
        try {
            generatePDFReport(financialData, fileName, title);
        } catch (err) {
            setError('Failed to generate PDF report: ' + err.message);
        }
    };
    const handleReconcileTransactions = () => {
        try {
            const reconciliationResult = reconcileTransactions(financialData);
            return reconciliationResult;
        } catch (err) {
            setError('Failed to reconcile transactions: ' + err.message);
            return null;
        }
    };
    return {
        financialData,
        loading,
        error,
        handleGenerateCSV,
        handleGeneratePDF,
        handleReconcileTransactions,
    };
};

export default useFinancialData;
