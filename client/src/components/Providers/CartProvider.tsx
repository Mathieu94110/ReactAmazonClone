import { ReactNode, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { cartItemsType } from "../../types/types";

function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<cartItemsType[]>([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
