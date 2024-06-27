import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------
export const getCategories = async () => {
  try {
    const response = await axios.get(URL_BASE + "/style/listar");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: ${response.status}`);
      errorAlert();
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    errorAlert();
    return null;
  }
};

// --------------- POST ---------------
export const addCategory = async (data) => {
  try {
    const response = await axios.post(
      `${URL_BASE}/style/registrar`,
      data
    );
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
    return error;
  }
};
// --------------- PUT ---------------

// --------------- DELETE ---------------
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      URL_BASE + "/style/eliminar/" + id
    );
    if (response.status === 200) {
      return response;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};