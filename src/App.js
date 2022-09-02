import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
   const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  // useEffect dipende da cartItems, useSelector prende cartItems da cart
  // Ogni volta che ci sarà un cambiamento in cartItems
  // verrà inviato calculateTotals()
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <main>
     {isOpen && < Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
