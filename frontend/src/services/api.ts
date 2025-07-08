import axios from 'axios';

const API_BASE_URL = 'http://10.12.36.242:5000/api';




export const generateRecipe = async (ingredients: string[]) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recipe`, { ingredients }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
