import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useProducts from '../../hooks/useProducts';

const ProductEdit = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { products, handleUpdateProduct, loading, error } = useProducts();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            console.error(`Product with ID ${productId} not found.`);
        }
    }, [productId, products]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Product name is required'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be positive'),
        description: Yup.string(),
        stock: Yup.number()
            .required('Stock quantity is required')
            .min(0, 'Stock cannot be negative'),
        imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
    });

    const handleSubmit = async (values) => {
        try {
            await handleUpdateProduct(productId, values);
            navigate(`/products/${productId}`);
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    if (loading || !product) return <p>Loading product data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
            <Formik
                initialValues={{
                    name: product.name,
                    price: product.price,
                    description: product.description || '',
                    stock: product.stock,
                    imageUrl: product.imageUrl || '', // Add imageUrl field to initial values
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Product Name
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <Field
                                type="number"
                                id="price"
                                name="price"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                Stock Quantity
                            </label>
                            <Field
                                type="number"
                                id="stock"
                                name="stock"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                                Image URL
                            </label>
                            <Field
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(`/products`)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductEdit;
