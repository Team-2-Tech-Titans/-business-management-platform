import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const db = getFirestore();

// Fetch all orders from Firestore
export const fetchOrders = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return orders;
    } catch (error) {
        throw new Error('Failed to fetch orders: ' + error.message);
    }
};

// Add a new order to Firestore
export const addOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), orderData);
        return { id: docRef.id, ...orderData };
    } catch (error) {
        throw new Error('Failed to add order: ' + error.message);
    }
};

// Update an existing order in Firestore
export const updateOrder = async (orderId, updatedData) => {
    try {
        const orderRef = doc(db, 'orders', orderId);
        await updateDoc(orderRef, updatedData);
        return { id: orderId, ...updatedData };
    } catch (error) {
        throw new Error('Failed to update order: ' + error.message);
    }
};

// Delete an order from Firestore
export const deleteOrder = async (orderId) => {
    try {
        const orderRef = doc(db, 'orders', orderId);
        await deleteDoc(orderRef);
    } catch (error) {
        throw new Error('Failed to delete order: ' + error.message);
    }
};
