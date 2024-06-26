import axios from "axios";
import https from 'https';
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

  export const getDjFavoritos = async () => {
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

  export const getDjCalificados = async () => {
    try {
      const response = await axios.get(URL_BASE + "/calificacion/listar");
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

export const getDjSearch = async () => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
    try {
      const response = await axios.get("http://192.168.1.81:8082/dj/buscador/2_2024-05-05_2024-06-06", { httpsAgent: agent });
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

export const updateFavoriteStatus = async (value) => {
  try {
    const response = await axios.post(`${URL_BASE}/favorito/registrar`, value);
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

export const addCalificacion = async (data) => {
  try {
    const response = await axios.post(`${URL_BASE}/calificacion/registrar`, data);
    if (response.status === 201) {
      return response.data;
    } else {
      errorAlert();
      return null;
    }
  } catch (error) {
    // console.error(`Error: ${error}`);
    // errorAlert();
    return error;
  }
};

// --------------- PUT ---------------

// --------------- DELETE ---------------
export const deleteFavorito = async (id) => {
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

export const deleteDj = async (id) => {
    try {
      const response = await axios.delete(`${URL_BASE}/dj/eliminar/${id}`);
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
