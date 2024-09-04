import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts'; // Assuming you're using a custom hook to fetch products

const ProductDetail = () => {
    const { productId } = useParams(); // Get product ID from URL
    const { products, loading } = useProducts(); // Get products and loading state
    const [product, setProduct] = useState(null);

    useEffect(() => {

        if (!loading && products.length > 0) {
            const foundProduct = products.find((p) => p.id === productId);
            setProduct(foundProduct);
        }
    }, [loading, products, productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <>
            <Link
                to={`/products`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded m-3"
            >
                Back
            </Link>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-xl font-semibold text-green-600 mb-4">${product.price}</p>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-medium">
                                Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProductDetail;
