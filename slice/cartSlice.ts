import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface InitialState {
  products: any[];
  quan: number;
  total: number;
}

const initialState: InitialState = { products: [], quan: 0, total: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quan += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
