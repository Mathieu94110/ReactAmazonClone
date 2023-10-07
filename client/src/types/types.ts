import { Dispatch, SetStateAction } from "react";

export type cartItemsType = {
  brand: string;
  category: string;
  description: string;
  image: string;
  name: string;
  numRev: number;
  price: number;
  qty: number;
  rating: number;
  stock: number;
  _id: string;
};
export type CheckoutStepsProps = {
  step1: boolean;
  step2: boolean;
  step3?: boolean;
  step4?: boolean;
};
export type MessageBoxProps = {
  variant?: "success" | "danger";
};
export type PriceCheckBoxProps = {
  checked: number;
  setChecked: Dispatch<SetStateAction<number>>;
  list: pricesRange[];
  handleFilters: (number) => void;
};

export type pricesRange = {
  id: number;
  name: string;
  array: number[];
};

export type CartContextType = {
  cartItems: cartItemsType[];
  setCartItems: Dispatch<SetStateAction<cartItemsType[]>>;
};

export type UserContextType = {
  user: {
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    fullName?: string;
    name?: string;
    password?: string;
    postalCode?: number;
    _id?: string;
  };
  signin: (x: SignInCredentials) => void;
  signout: () => void;
};
type SignInCredentials = {
  email: string;
  password: string;
};
