import { CartItemsType } from "@/types/types";

const API_PRODUCTS = `${process.env.REACT_APP_API_PRODUCTS}`;

export async function getProductsList(): Promise<CartItemsType[]> {
  try {
    const response = await fetch(API_PRODUCTS);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}
