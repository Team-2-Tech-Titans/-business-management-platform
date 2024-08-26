import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
} from '../constants/userConstants';

import {
    loginUser as loginUserService,
    logoutUser as logoutUserService,
    fetchUserProfile as fetchUserProfileService,
    updateUserProfile as updateUserProfileService,
} from '../../services/authService';

// Action to log in a user
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const data = await loginUserService(credentials);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
    }
};

// Action to log out a user
export const logoutUser = () => async (dispatch) => {
    try {
        await logoutUserService();
        dispatch({ type: USER_LOGOUT });
    } catch (error) {
        console.error('Failed to log out:', error);
    }
};

// Action to fetch the user profile
export const fetchUserProfile = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_PROFILE_REQUEST });
    try {
        const data = await fetchUserProfileService();
        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
    }
};

// Action to update the user profile
export const updateUserProfile = (updatedData) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
        const data = await updateUserProfileService(updatedData);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAILURE, payload: error.message });
    }
};
