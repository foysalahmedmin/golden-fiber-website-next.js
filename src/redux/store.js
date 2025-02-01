import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { cartSlice } from "./slices/cartSlice";
import orderReducer, { orderSlice } from "./slices/orderSlice";

export default configureStore({
  reducer: {
    [cartSlice.name]: cartReducer,
    [orderSlice.name]: orderReducer,
  },
});
