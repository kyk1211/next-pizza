import cartReducer from '@slice/cartSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
