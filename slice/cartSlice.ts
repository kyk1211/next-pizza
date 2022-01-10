import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface cartInfo extends products {
  price: number;
  quan: number;
  extras: Opts[];
}

interface InitialState {
  products: cartInfo[];
  quan: number;
  total: number;
}

const initialState: InitialState = {
  products: [],
  quan: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cartInfo>) => {
      state.products.push(action.payload);
      state.quan += 1;
      state.total += action.payload.price * action.payload.quan;
    },
    removeProduct: (state, action: PayloadAction<cartInfo>) => {
      state.total -= action.payload.price * action.payload.quan;
      state.quan -= 1;
      state.products = state.products.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
      );
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
