import axios from "axios";
import { URL_BASE, errorAlert } from "./base.js";

// --------------- GET ---------------
export const getDjs = async () => {
  try {
    const response = await axios.get(URL_BASE + "/dj/listar");
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

export const getTopDjs = async () => {
  try {
    const response = await axios.get(URL_BASE + "/dj/top10");
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

export const getDj = async (id) => {
    try {
      const response = await axios.get(URL_BASE + `/dj/${id}`);
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
export const addDj = async (dj) => {
  console.log(dj)
  try {
    const response = await axios.post(`${URL_BASE}/dj/registrar`, dj);
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
