import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------
export const getUsers = async () => {
  try {
    const response = await axios.get(URL_BASE + "/usuarios/listar");
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

export const getUser = async (id) => {
  try {
    const response = await axios.get(URL_BASE + `/usuarios/${id}`);
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

export const getUserByEmail = async (email) => {
  const response = await axios.get(URL_BASE + `/usuarios/${email}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

// --------------- POST ---------------
export const postUser = async (user) => {
  try {
    const response = await axios.post(URL_BASE + `/usuarios/registrar`, user);
    if (response.status === 201) {
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

// --------------- PUT ---------------

// --------------- DELETE ---------------
