import {
  addItemToLocalCart,
  clearLocalCart,
  getLocalCart,
  removeItemFromLocalCart,
} from "@/utils/cartStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = getLocalCart() || {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      const { id, quantity } = payload;
      addItemToLocalCart(id, quantity);

      if (quantity !== undefined) {
        if (quantity < 1) {
          delete state[id];
        } else {
          state[id] = quantity;
        }
      } else {
        state[id] = (state[id] || 0) + 1;
      }
    },

    removeItemFromCart: (state, { payload }) => {
      const { id } = payload;
      removeItemFromLocalCart(id);
      if (id in state) {
        delete state[id];
      }
    },

    clearCart: (state) => {
      clearLocalCart();
      Object.keys(state).forEach((id) => delete state[id]);
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
