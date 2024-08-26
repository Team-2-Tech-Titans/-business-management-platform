import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
    user: userReducer,
    // Add more reducers here as your app grows
});

export default rootReducer;
