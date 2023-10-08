import { ReactNode, useState } from "react";
import { CartContext } from "../Context";
import { CartItemsType } from "@/types/types";

function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

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
