import React, { useState, useEffect } from 'react';
import ProductList from '../features/product-inventory/ProductList';
import ProductDetail from '../features/product-inventory/ProductDetail';
import { fetchProducts, deleteProduct } from '../services/productService';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleProductSelect = (productId) => {
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(product);
    };

    const handleProductDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter((product) => product.id !== productId));
            setSelectedProduct(null);
        } catch (err) {
            setError('Failed to delete the product.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Product Management</h1>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ProductList
                            products={products}
                            onSelectProduct={handleProductSelect}
                            onDeleteProduct={handleProductDelete}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        {selectedProduct ? (
                            <ProductDetail product={selectedProduct} />
                        ) : (
                            <p>Select a product to view details</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
