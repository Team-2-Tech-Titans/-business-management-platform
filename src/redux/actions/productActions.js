import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../constants/productConstants';

import {
    fetchProducts as fetchProductsService,
    addProduct as addProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
} from '../../services/productService';

// Action to fetch products
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const data = await fetchProductsService();
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

// Action to add a new product
export const addProduct = (productData) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    try {
        const data = await addProductService(productData);
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAILURE, payload: error.message });
    }
};

// Action to update an existing product
export const updateProduct = (productId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const data = await updateProductService(productId, updatedData);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
    }
};

// Action to delete a product
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await deleteProductService(productId);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};
