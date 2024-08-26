import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const ProductDetail = () => {
    const { productId } = useParams(); // Assuming you are using React Router
    const { products, loading, error } = useProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === productId);
        setProduct(foundProduct);
    }, [productId, products]);

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!product) return <p>Product not found</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">Price: ${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {product.specifications?.map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Stock:</h3>
                <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;
