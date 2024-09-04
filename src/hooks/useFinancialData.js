import { useState, useEffect, useCallback } from 'react';
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
    const [hasFetched, setHasFetched] = useState(false); // To prevent continuous re-fetch

    useEffect(() => {
        const loadFinancialData = async () => {
            if (hasFetched) return; // Stop re-fetching if data has already been fetched

            setLoading(true);
            try {
                const data = await fetchFinancialData(collectionName, filters);
                setFinancialData(data);
                setHasFetched(true); // Mark that data has been fetched
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadFinancialData();
    }, [collectionName, filters, hasFetched]);

    const handleGenerateCSV = useCallback((fileName = 'financial_report.csv') => {
        try {
            generateCSVReport(financialData, fileName);
        } catch (err) {
            setError('Failed to generate CSV report: ' + err.message);
        }
    }, [financialData]);

    const handleGeneratePDF = useCallback((fileName = 'financial_report.pdf', title = 'Financial Report') => {
        try {
            generatePDFReport(financialData, fileName, title);
        } catch (err) {
            setError('Failed to generate PDF report: ' + err.message);
        }
    }, [financialData]);

    const handleReconcileTransactions = useCallback(() => {
        try {
            if (financialData.length === 0) return null; // Prevent reconciliation on empty data
            const reconciliationResult = reconcileTransactions(financialData);
            return reconciliationResult;
        } catch (err) {
            setError('Failed to reconcile transactions: ' + err.message);
            return null;
        }
    }, [financialData]);

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
