import { SetStateAction, createContext } from "react";

type CartContextType = {
  cartItems: any[];
  setCartItems: SetStateAction<any>;
};

export const CartContext = createContext<CartContextType | null>(null);
