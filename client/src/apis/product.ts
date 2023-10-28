import { CartItemsType, ProductType } from "@/types/types";

const API_PRODUCTS = `${process.env.REACT_APP_API_PRODUCTS}`;

export async function getProductsList(): Promise<CartItemsType[]> {
  try {
    const response = await fetch(API_PRODUCTS);
    console.log(response);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProductDetails(productID): Promise<ProductType> {
  try {
    console.log(`${API_PRODUCTS}/${productID}`);
    const response = await fetch(`${API_PRODUCTS}/${productID}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}
