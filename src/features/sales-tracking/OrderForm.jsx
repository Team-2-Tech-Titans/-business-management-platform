import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import useProducts from '../../hooks/useProducts';

const OrderForm = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders, handleAddOrder, handleUpdateOrder, loading, error } = useOrders();
    const { products } = useProducts();
    const [order, setOrder] = useState({
        customerName: '',
        customerEmail: '',
        status: '',
        items: [],
    });

    useEffect(() => {
        if (orderId) {
            const foundOrder = orders.find((o) => o.id === orderId);
            if (foundOrder) {
                setOrder({
                    customerName: foundOrder.customerName,
                    customerEmail: foundOrder.customerEmail,
                    status: foundOrder.status,
                    items: foundOrder.items,
                });
            }
        }
    }, [orderId, orders]);

    const validationSchema = Yup.object().shape({
        customerName: Yup.string().required('Customer name is required'),
        customerEmail: Yup.string().email('Invalid email address').required('Customer email is required'),
        status: Yup.string().required('Order status is required'),
        items: Yup.array().of(
            Yup.object().shape({
                productId: Yup.string().required('Product is required'),
                quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
                price: Yup.number().required('Price is required').positive('Price must be positive'),
            })
        ),
    });

    const handleProductChange = (productId, index, setFieldValue) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setFieldValue(`items[${index}].productId`, productId);
            setFieldValue(`items[${index}].price`, product.price); // Set product price
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (orderId) {
                await handleUpdateOrder(orderId, values);
            } else {
                await handleAddOrder(values);
            }
            navigate('/orders');
        } catch (err) {
            console.error('Failed to save order:', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">{orderId ? 'Edit Order' : 'Create New Order'}</h1>
            <Formik
                initialValues={order}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                                Customer Name
                            </label>
                            <Field
                                type="text"
                                id="customerName"
                                name="customerName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerEmail">
                                Customer Email
                            </label>
                            <Field
                                type="email"
                                id="customerEmail"
                                name="customerEmail"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <ErrorMessage name="customerEmail" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                Order Status
                            </label>
                            <Field
                                as="select"
                                id="status"
                                name="status"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2">Items</h3>
                            {values.items.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex mb-2">
                                        <div className="flex-1 mr-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`items[${index}].productId`}>
                                                Product
                                            </label>
                                            <Field
                                                as="select"
                                                id={`items[${index}].productId`}
                                                name={`items[${index}].productId`}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={(e) => handleProductChange(e.target.value, index, setFieldValue)}
                                            >
                                                <option value="">Select product</option>
                                                {products.map((product) => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name={`items[${index}].productId`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div className="flex-1 ml-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`items[${index}].quantity`}>
                                                Quantity
                                            </label>
                                            <Field
                                                type="number"
                                                id={`items[${index}].quantity`}
                                                name={`items[${index}].quantity`}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage name={`items[${index}].quantity`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div className="flex-1 ml-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={`items[${index}].price`}>
                                                Price
                                            </label>
                                            <Field
                                                type="number"
                                                id={`items[${index}].price`}
                                                name={`items[${index}].price`}
                                                readOnly
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage name={`items[${index}].price`} component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => setFieldValue('items', [...values.items, { productId: '', quantity: 1, price: 0 }])}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Item
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {isSubmitting ? 'Saving...' : orderId ? 'Update Order' : 'Create Order'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/orders')}
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

export default OrderForm;
