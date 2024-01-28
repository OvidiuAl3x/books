// services/categoryService.js
import axios from "axios";

const baseURL = "http://localhost:5555"; // Update with your backend URL

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};
