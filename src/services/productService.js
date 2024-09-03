import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'

// Fetch all products from Firestore
export const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return products;
    } catch (error) {
        throw new Error('Failed to fetch products: ' + error.message);
    }
};

// Add a new product to Firestore
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), productData);
        return { id: docRef.id, ...productData };
    } catch (error) {
        throw new Error('Failed to add product: ' + error.message);
    }
};

// Update an existing product in Firestore
export const updateProduct = async (productId, updatedData) => {
    try {
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, updatedData);
        return { id: productId, ...updatedData };
    } catch (error) {
        throw new Error('Failed to update product: ' + error.message);
    }
};

// Delete a product from Firestore
export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(db, 'products', productId);
        await deleteDoc(productRef);
    } catch (error) {
        throw new Error('Failed to delete product: ' + error.message);
    }
};
