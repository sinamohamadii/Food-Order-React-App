import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";

function App() {
  const [cartToggle, setCartToggle] = useState(false);

  const cartToggleHandler = () => {
    setCartToggle((prevState) => {
      return !prevState;
    });
  };

  return (
    <CartProvider>
      {cartToggle && <Cart onCartToggle={cartToggleHandler} />}
      <Header onCartToggle={cartToggleHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
