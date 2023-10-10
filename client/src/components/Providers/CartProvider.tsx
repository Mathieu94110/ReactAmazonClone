import { ReactNode, useState } from "react";
import { CartItemsType } from "@/types/types";
import { createContext } from "react";
import { CartContextType } from "@/types/types";

export const CartContext = createContext<CartContextType | null>(null);

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
