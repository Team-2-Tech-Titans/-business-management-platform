import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/actions/orderActions';

const OrderDelete = ({ orderId }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteOrder(orderId));
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Delete
        </button>
    );
};

export default OrderDelete;
