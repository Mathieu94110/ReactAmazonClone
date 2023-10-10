const API_PRODUCTS = "https://react-amazon-clone-4g1h.vercel.app/api/products";

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
