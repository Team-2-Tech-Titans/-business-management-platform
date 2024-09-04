import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';

const ProductDelete = ({ productId, productName }) => {
    const { handleDeleteProduct } = useProducts();
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState(null);

    const confirmDelete = async () => {
        try {
            await handleDeleteProduct(productId);
            setIsConfirming(false);
        } catch (err) {
            setError('Failed to delete product: ' + err.message);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {!isConfirming ? (
                <button
                    onClick={() => setIsConfirming(true)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Delete Product
                </button>
            ) : (
                <div>
                    <p className="text-red-600 mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
                    <button
                        onClick={confirmDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Confirm Delete
                    </button>
                    <button
                        onClick={() => setIsConfirming(false)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDelete;
