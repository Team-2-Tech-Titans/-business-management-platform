import { useState, useEffect } from 'react';
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../services/productService';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleAddProduct = async (productData) => {
        try {
            const newProduct = await addProduct(productData);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        } catch (err) {
            setError('Failed to add product: ' + err.message);
        }
    };

    const handleUpdateProduct = async (productId, updatedData) => {
        try {
            const updatedProduct = await updateProduct(productId, updatedData);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? updatedProduct : product
                )
            );
        } catch (err) {
            setError('Failed to update product: ' + err.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        } catch (err) {
            setError('Failed to delete product: ' + err.message);
        }
    };

    return {
        products,
        loading,
        error,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
    };
};

export default useProducts;
