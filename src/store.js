import { configureStore } from "@reduxjs/toolkit";

// Importiamo vari dati da cartSlice, il reducer che compare
// nel console.log è quello che ci permetterà di controllare 
// lo state in questo file.
import "./features/cart/cartSlice";
// Serve a imparare cartSlice.reducer
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
