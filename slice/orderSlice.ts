import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reset } from './cartSlice';

interface initialState {
  name: string;
  phone: string;
  addr: string;
}

const initialState: initialState = {
  name: '',
  phone: '',
  addr: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<initialState>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.addr = action.payload.addr;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, (state) => {
      state = initialState;
    });
  },
});

export default orderSlice.reducer;
export const { updateInfo } = orderSlice.actions;
