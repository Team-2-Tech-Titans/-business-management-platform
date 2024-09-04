import React, { useState, useEffect } from 'react';
import ProductList from '../features/product-inventory/ProductList';
import ProductDetail from '../features/product-inventory/ProductDetail';
import ProductForm from '../features/product-inventory/ProductForm'; // Import ProductForm
import { fetchProducts, deleteProduct } from '../services/productService';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductForm, setShowProductForm] = useState(false); // State to manage form visibility
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
        setShowProductForm(false); // Hide the form when selecting a product
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

    const handleAddProduct = () => {
        setShowProductForm(!showProductForm); // Toggle form visibility
        setSelectedProduct(null); // Reset selected product
    };

    const handleFormSubmit = (newProduct) => {
        setProducts([...products, newProduct]); // Add new product to the list
        setShowProductForm(false); // Hide the form after submission
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Product Management</h1>

            <button
                className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleAddProduct}
            >
                {showProductForm ? 'Cancel' : 'Add New Product'}
            </button>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {showProductForm ? (
                            <ProductForm onSubmit={handleFormSubmit} />
                        ) : (
                            <ProductList
                                products={products}
                                onSelectProduct={handleProductSelect}
                                onDeleteProduct={handleProductDelete}
                            />
                        )}
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
