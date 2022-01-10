import cartReducer from '@slice/cartSlice';
import { combineReducers } from 'redux';
import orderReducer from '@slice/orderSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
