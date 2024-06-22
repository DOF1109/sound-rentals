import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------

export const getReservas = async () => {
  try {
    const response = await axios.get(URL_BASE + "/reservas/listar");
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

export const getReservasByUser = async (id) => {
  try {
    const response = await axios.get(URL_BASE + "/reservas/usuario/"+id);
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

export const addReserva = async (reserva) => {
  try {
    const response = await axios.post(`${URL_BASE}/reservas/registrar`, reserva);
    if (response.status === 201) {
      return response;
    } else {
      errorAlert();
      return response;
    }
  } catch (error) {
    // console.error(`Error: ${error}`);
    // errorAlert();
    return error;
  }
};

// --------------- PUT ---------------

// --------------- DELETE ---------------
