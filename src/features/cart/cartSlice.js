import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  // Si riferisce all'array di oggetti importato
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // In questa funzione vogliamo che a cartItems
      // venga assegnato un array vuoto
       state.cartItems = [];
      // Vediamo un metodo alternativo:
      // return { cartItems: [] };
    },
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
