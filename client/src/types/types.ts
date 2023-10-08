import { Dispatch, SetStateAction } from "react";
//Users
export type UserType = {
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

export type UserContextType = {
  user: UserType;
  signin: (x: SignInCredentials) => void;
  signout: () => void;
};

export type UserShippingAddressInput = {
  fullName: string;
  address: string;
  postalCode: number | null;
  city: string;
  country: string;
  userId: string;
  generic: { generic: { message: string } };
};

type SignInCredentials = {
  email: string;
  password: string;
};

export type UserSigninInput = {
  email: string;
  password: string;
  generic: { generic: { message: string } };
};
export type UserSignupInput = {
  name: string;
  email: string;
  password: string;
  generic: { generic: { message: string } };
};

export type UserProfileType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

//Products

export type ProductType = {
  image: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  numRev: number;
  stock: number;
};

export type CartItemsType = {
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

export type CartContextType = {
  cartItems: CartItemsType[];
  setCartItems: Dispatch<SetStateAction<CartItemsType[]>>;
};

export type PriceCheckBoxProps = {
  checkedId: number;
  setCheckedId: Dispatch<SetStateAction<number>>;
  list: PricesRange[];
  handleFilters: (number) => void;
};

export type PricesRange = {
  id: number;
  name: string;
  array: [number, number];
};

export type RatingProps = {
  rating: number;
  numRev: number;
};

//Order steps
export type CheckoutStepsProps = {
  step1: boolean;
  step2: boolean;
  step3?: boolean;
  step4?: boolean;
};

//Global
export type MessageBoxProps = {
  variant?: "success" | "danger";
};

export type WindowSize = {
  width: number;
  height: number;
};
