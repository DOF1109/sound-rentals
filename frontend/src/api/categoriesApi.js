import axios from "axios";

const URL_BASE = "http://localhost:8081";

export const getCategories = async () => {
  try {
    const response = await axios.get(URL_BASE + "/style/listar");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};