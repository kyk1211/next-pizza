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
  id: string;
}

const initialState: InitialState = {
  products: [],
  quan: 0,
  total: 0,
  id: '',
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
    setId: (state) => {
      state.id = nanoid();
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const { addProduct, reset, removeProduct, setId } = cartSlice.actions;
export default cartSlice.reducer;
