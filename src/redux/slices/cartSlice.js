import cartStorage from "@/utils/cartStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: cartStorage.getCartItems() || {},
  products: [],
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      const { id, quantity } = payload;
      cartStorage?.addCartItem(id, quantity);

      if (quantity !== undefined) {
        if (quantity < 1) {
          delete state[id];
        } else {
          state[id] = quantity;
        }
      } else {
        state.items[id] = (state[id] || 0) + 1;
      }
    },

    removeCartItem: (state, { payload }) => {
      const { id } = payload;
      cartStorage?.removeCartItem(id);
      if (id in state.items) {
        delete state.items[id];
      }
    },

    setCartProducts: (state, { payload }) => {
      state.products = payload;
    },

    clearCart: (state) => {
      cartStorage?.clearCartItems();
      state.items = {};
      state.products = [];
    },

    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  setCartProducts,
  clearCart,
  setLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
