const API_PRODUCTS = "/api/products";

export async function getProductsList() {
  try {
    const response = await fetch(API_PRODUCTS);
    console.log(JSON.stringify(response));
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export const getProductDetails = async (productID) => {
  try {
    const response = await fetch(`$API_PRODUCTS/${productID}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};
