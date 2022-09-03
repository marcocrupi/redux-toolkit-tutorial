import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";
import axios from "axios";


const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  // Si riferisce all'array di oggetti importato
  // cartItems: cartItems,
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  // Con thunkAPI prediamo lo state dell'intera applicazione.
  async (name, thunkAPI) => {
    try {

      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      // Da non confondere con l'amount generale, questo è specifico per ogni item.
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;