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
    UNBLOCK_USER_SUCCESS
} from '../constants/userConstants';

const initialState = {
    user: null,
    users: [], // Add this line for handling the list of users
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_UPDATE_REQUEST:
        case FETCH_USER_PROFILE_REQUEST:
        case FETCH_USERS_REQUEST: // Add this case to handle fetching users
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
        case USER_UPDATE_SUCCESS:
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case FETCH_USERS_SUCCESS: // Add this case to handle fetched users
            return {
                ...state,
                loading: false,
                users: action.payload, // Store the list of users
            };
        case USER_LOGIN_FAILURE:
        case USER_UPDATE_FAILURE:
        case FETCH_USER_PROFILE_FAILURE:
        case FETCH_USERS_FAILURE: // Handle fetch users failure
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case BLOCK_USER_SUCCESS:
        case UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload ? { ...user, isBlocked: action.type === BLOCK_USER_SUCCESS } : user
                ),
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};
