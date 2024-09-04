import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import ProductDelete from './ProductDelete';

const ProductList = () => {
    const { products, loading, error } = useProducts();

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (

                    <div key={product.id} className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <img src={product.imageUrl} alt="product" />
                        <p className="text-gray-700 mb-2">Price: ${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center flex-col gap-3">
                            <div className='flex gap-2'>
                                <Link
                                    to={`/products/${product.id}`}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/products/edit/${product.id}`}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Edit
                                </Link>
                            </div>
                            <ProductDelete productId={product.id} productName={product.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
