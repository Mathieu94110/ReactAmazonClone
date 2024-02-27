import { createContext, ReactNode, useState } from "react";
import { CartItemsType, CartContextType } from "@/types/types";

export const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [allCartItems, setAllCartItems] = useState<CartItemsType[]>([]);
  const [selectedCardItems, setSelectedCardItems] = useState<CartItemsType[]>(
    []
  );

  return (
    <CartContext.Provider
      value={{
        selectedCardItems,
        setSelectedCardItems,
        allCartItems,
        setAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
