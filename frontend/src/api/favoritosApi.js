import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";


 // ----------------- GET --------------------
export const getFavoritos = async () => {
    try {
      const response = await axios.get(URL_BASE + "/favorito/listar");
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

  // ----------------- POST --------------------
  export const addFavoritos = async (dj) => {
    console.log(dj)
    try {
      const response = await axios.post(`${URL_BASE}/favorito/registrar`, dj);
      if (response.status === 201) {
        return response;
      } else {
        errorAlert();
        return response;
      }
    } catch (error) {
      return error;
    }
  };


  // ----------------- DELETE --------------------
export const deleteFavorito = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${URL_BASE}/favorito/eliminar/${id}`);
      if (response.status === 200 || response.status === 204) {
        return response;
      } else {
        errorAlert();
        return response;
      }
    } catch (error) {
      return error;
    }
  };
  
