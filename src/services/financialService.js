import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import Papa from 'papaparse';

// Fetch financial data from Firestore
export const fetchFinancialData = async (collectionName, filters = {}) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error('Error fetching financial data:', error);
        throw new Error('Failed to fetch financial data: ' + error.message);
    }
};

// Generate CSV report
export const generateCSVReport = (data, fileName = 'financial_report.csv') => {
    if (!data.length) {
        console.warn('No data available for CSV report generation');
        throw new Error('No data available for the report.');
    }
    try {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, fileName);
    } catch (error) {
        console.error('Error generating CSV report:', error);
    }
};

// Generate PDF report
export const generatePDFReport = (data, fileName = 'financial_report.pdf', title = 'Financial Report') => {
    if (!data.length) {
        console.warn('No data available for PDF report generation');
        throw new Error('No data available for the report.');
    }
    try {
        const doc = new jsPDF();
        doc.text(title, 10, 10);
        const tableData = data.map(item => Object.values(item));
        doc.autoTable({
            head: [Object.keys(data[0])],
            body: tableData,
        });
        doc.save(fileName);
    } catch (error) {
        console.error('Error generating PDF report:', error);
    }
};

// Reconcile transactions
export const reconcileTransactions = (financialData) => {
    if (!financialData || !financialData.length) {
        console.warn('No financial data available for reconciliation');
        return { totalDebits: 0, totalCredits: 0, balance: 0 };
    }

    try {
        const { totalDebits, totalCredits } = financialData.reduce(
            (totals, transaction) => {
                if (transaction.type === 'debit') {
                    totals.totalDebits += transaction.amount;
                } else if (transaction.type === 'credit') {
                    totals.totalCredits += transaction.amount;
                }
                return totals;
            },
            { totalDebits: 0, totalCredits: 0 }
        );

        const balance = totalCredits - totalDebits;
        return { totalDebits, totalCredits, balance };
    } catch (error) {
        console.error('Error during transaction reconciliation:', error);
        throw new Error('Failed to reconcile transactions: ' + error.message);
    }
};

