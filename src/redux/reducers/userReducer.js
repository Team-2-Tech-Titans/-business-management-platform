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

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_UPDATE_REQUEST:
        case FETCH_USER_PROFILE_REQUEST:
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
        case USER_LOGIN_FAILURE:
        case USER_UPDATE_FAILURE:
        case FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
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
