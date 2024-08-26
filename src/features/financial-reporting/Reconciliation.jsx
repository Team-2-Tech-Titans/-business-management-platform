import React, { useState, useEffect } from 'react';
import useFinancialData from '../../hooks/useFinancialData';

const Reconciliation = () => {
    const { financialData, loading, error, handleReconcileTransactions } = useFinancialData('transactions');
    const [reconciliationResult, setReconciliationResult] = useState(null);

    useEffect(() => {
        if (financialData.length > 0) {
            const result = handleReconcileTransactions();
            setReconciliationResult(result);
        }
    }, [financialData, handleReconcileTransactions]);

    if (loading) return <p>Loading financial data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Reconciliation Summary</h2>

            {reconciliationResult ? (
                <div>
                    <p><strong>Total Debits:</strong> ${reconciliationResult.totalDebits.toFixed(2)}</p>
                    <p><strong>Total Credits:</strong> ${reconciliationResult.totalCredits.toFixed(2)}</p>
                    <p><strong>Balance:</strong> ${reconciliationResult.balance.toFixed(2)}</p>

                    {reconciliationResult.balance !== 0 ? (
                        <p className="text-red-600 mt-4">
                            Discrepancy detected! The balance is not zero. Please review the transactions.
                        </p>
                    ) : (
                        <p className="text-green-600 mt-4">The accounts are balanced.</p>
                    )}
                </div>
            ) : (
                <p>No financial data available for reconciliation.</p>
            )}
        </div>
    );
};

export default Reconciliation;
