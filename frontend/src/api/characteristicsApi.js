import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------
export const getCharacteristics = async () => {
  try {
    const response = await axios.get(URL_BASE + "/caracteristica/listar");
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
export const addCharacteristic = async (data) => {
  try {
    const response = await axios.post(
      `${URL_BASE}/caracteristica/registrar`,
      data
    );
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
    return error;
  }
};

// --------------- PUT ---------------
export const updateCharacteristic = async (data) => {
  try {
    const response = await axios.put(
      `${URL_BASE}/caracteristica/actualizar`,
      data
    );
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
    return error;
  }
};

// --------------- DELETE ---------------
export const deleteCharacteristic = async (id) => {
  try {
    const response = await axios.delete(
      URL_BASE + "/caracteristica/eliminar/" + id
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
