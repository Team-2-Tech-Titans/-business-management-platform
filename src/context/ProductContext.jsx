import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const addNewProduct = async (productData) => {
        try {
            const newProduct = await addProduct(productData);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        } catch (err) {
            setError('Failed to add the product.');
        }
    };

    const updateExistingProduct = async (productId, updatedData) => {
        try {
            const updatedProduct = await updateProduct(productId, updatedData);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === productId ? updatedProduct : product))
            );
        } catch (err) {
            setError('Failed to update the product.');
        }
    };

    const deleteExistingProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        } catch (err) {
            setError('Failed to delete the product.');
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                addNewProduct,
                updateExistingProduct,
                deleteExistingProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
