# REDUX TOOLKIT TUTORIAL

Video link: [Redux Toolkit Tutorial – JavaScript State Management Library](https://www.youtube.com/watch?v=bbkBuqC1rU4) 

Installation: [Getting Started with Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

Original Repo: [john-smilga/redux-toolkit-tutorial](https://github.com/john-smilga/redux-toolkit-tutorial)

## STEP

Fasi del tutorial.
### Intallazione

npm install @reduxjs/toolkit react-redux

Facendo così installiamo alcune librerie molto utili: 

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

### Intro

Redux può essere utilizzato su qualsiasi framework e non è specifico per React.

### Creare lo Store

Contiene lo state della nostra applicazione.

In "src" creiamo il file "store.js".

```js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

In questa funzione passiamo il "reducer" che sarà un oggetto a sua volta.

### Setup Provider

- index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store and provider
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

In index.js importiamo lo "store" (il nostro file) e "Provider" (una libreria).

"Provider" connette il redux store con la nostra applicazione. Infatti il tag "Provider" avvolge la nostra intera applicazione.

### Setup Cart Slice

- application feature
- create features folder/cart
- create cartSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
});

console.log(cartSlice);

export default cartSlice.reducer;
```

- store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```
### Redux DevTools

- extension per Chrome, si accede dagli strumenti per gli sviluppatori. Da qui è possibile vedere gli state che abbiamo nel file "cartSlice.js".
Qualunque cambiamento possiamo vederlo da qui.

### Accedere ai dati nello Store

Vediamo come accedere all'initial state da ogni componente.

- create components/Navbar.js

```js
import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```
In questo codice stiamo accedendo alla proprietà "amount" in cartSlice dalla nostra navbar.

"useSelector" ci permette di accedere all'intero state della nostra applicazione

Possiamo chiamare il parametro (state) dopo "useSelector" come vogliamo. 

### Hero Icons

Per questo progetto sono state usate le [Hero Icons](https://heroicons.com/)

```css
nav svg {
  width: 40px;
  color: var(--clr-white);
}
```

