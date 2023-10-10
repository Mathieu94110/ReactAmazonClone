const API_PRODUCTS = "https://162.19.76.243/api/products";

export async function getProductsList() {
  try {
    const response = await fetch(API_PRODUCTS);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}

export const getProductDetails = async (productID) => {
  try {
    const response = await fetch(`${API_PRODUCTS}/${productID}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};
