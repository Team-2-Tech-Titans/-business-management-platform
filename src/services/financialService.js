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
        throw new Error('Failed to fetch financial data: ' + error.message);
    }
};

// Generate CSV report
export const generateCSVReport = (data, fileName = 'financial_report.csv') => {
    if (!data.length) throw new Error('No data available for the report.');
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
};

// Generate PDF report
export const generatePDFReport = (data, fileName = 'financial_report.pdf', title = 'Financial Report') => {
    if (!data.length) throw new Error('No data available for the report.');
    const doc = new jsPDF();
    doc.text(title, 10, 10);
    const tableData = data.map(item => Object.values(item));
    doc.autoTable({
        head: [Object.keys(data[0])],
        body: tableData,
    });
    doc.save(fileName);
};

// Reconcile transactions
export const reconcileTransactions = (financialData) => {
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
};
