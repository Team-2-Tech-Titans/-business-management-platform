import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const db = getFirestore();

// Fetch financial data from Firestore (e.g., transactions, reports)
export const fetchFinancialData = async (collectionName, filters = {}) => {
    try {
        let q = query(collection(db, collectionName));

        // Apply filters if provided
        if (filters) {
            Object.keys(filters).forEach((key) => {
                q = query(q, where(key, '==', filters[key]));
            });
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return data;
    } catch (error) {
        throw new Error('Failed to fetch financial data: ' + error.message);
    }
};

// Add new financial data to Firestore
export const addFinancialData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return { id: docRef.id, ...data };
    } catch (error) {
        throw new Error('Failed to add financial data: ' + error.message);
    }
};

// Generate CSV report from financial data
export const generateCSVReport = (data, fileName = 'financial_report.csv') => {
    try {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, fileName);
    } catch (error) {
        throw new Error('Failed to generate CSV report: ' + error.message);
    }
};

// Generate PDF report from financial data
export const generatePDFReport = (data, fileName = 'financial_report.pdf', title = 'Financial Report') => {
    try {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text(title, 14, 22);

        // Generate table
        const tableData = data.map((item) => Object.values(item));
        const tableHeaders = Object.keys(data[0]);

        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 30,
        });

        // Save the PDF
        doc.save(fileName);
    } catch (error) {
        throw new Error('Failed to generate PDF report: ' + error.message);
    }
};

// Reconcile financial data
export const reconcileTransactions = (transactions) => {
    try {
        // Example reconciliation logic
        const totalDebits = transactions
            .filter((txn) => txn.type === 'debit')
            .reduce((sum, txn) => sum + txn.amount, 0);

        const totalCredits = transactions
            .filter((txn) => txn.type === 'credit')
            .reduce((sum, txn) => sum + txn.amount, 0);

        return {
            totalDebits,
            totalCredits,
            balance: totalCredits - totalDebits,
        };
    } catch (error) {
        throw new Error('Failed to reconcile transactions: ' + error.message);
    }
};
