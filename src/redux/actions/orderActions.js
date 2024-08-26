import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
} from '../constants/orderConstants';

import {
    fetchOrders as fetchOrdersService,
    addOrder as addOrderService,
    updateOrder as updateOrderService,
    deleteOrder as deleteOrderService,
} from '../../services/orderService';

// Action to fetch orders
export const fetchOrders = () => async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
        const data = await fetchOrdersService();
        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_ORDERS_FAILURE, payload: error.message });
    }
};

// Action to add a new order
export const addOrder = (orderData) => async (dispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
        const data = await addOrderService(orderData);
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_ORDER_FAILURE, payload: error.message });
    }
};

// Action to update an existing order
export const updateOrder = (orderId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    try {
        const data = await updateOrderService(orderId, updatedData);
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAILURE, payload: error.message });
    }
};

// Action to delete an order
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        await deleteOrderService(orderId);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
};
