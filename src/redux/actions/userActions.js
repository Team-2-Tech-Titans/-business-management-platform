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
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    BLOCK_USER_SUCCESS,
    UNBLOCK_USER_SUCCESS,
} from '../constants/userConstants';

import {
    loginUser as loginUserService,
    logoutUser as logoutUserService,
    fetchUserProfile as fetchUserProfileService,
    updateUserProfile as updateUserProfileService,
} from '../../services/authService';

import { db } from '../../services/firebase';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';

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

// Action to fetch all users
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

// Action to block a user
export const blockUser = (userId) => async (dispatch) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { isBlocked: true });

        dispatch({ type: BLOCK_USER_SUCCESS, payload: userId });
    } catch (error) {
        console.error('Failed to block user:', error.message);
    }
};

// Action to unblock a user
export const unblockUser = (userId) => async (dispatch) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { isBlocked: false });

        dispatch({ type: UNBLOCK_USER_SUCCESS, payload: userId });
    } catch (error) {
        console.error('Failed to unblock user:', error.message);
    }
};
