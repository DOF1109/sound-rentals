import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------
export const getCiudades = async () => {
  try {
    const response = await axios.get(URL_BASE + "/ciudad/listar");
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

// --------------- PUT ---------------

// --------------- DELETE ---------------
