const API_PRODUCTS = `${process.env.REACT_APP_API_PRODUCTS}`;

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
    console.log(`${API_PRODUCTS}/${productID}`);
    const response = await fetch(`${API_PRODUCTS}/${productID}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};
