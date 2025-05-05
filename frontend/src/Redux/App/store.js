import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Feature/cartSlice"

const store = configureStore({
  reducer: {
    cart: cartSlice
  },
});

export default store;