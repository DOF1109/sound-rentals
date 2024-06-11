import React, { useState, useEffect } from "react";
import { getFavoritos } from "../../api/favoritosApi";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  const obtenerFavoritos = async () => {
    try {
      const data = await getFavoritos();
      if (data) {
        setFavoritos(data);
      }
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  return (
    <div>
      <h2>Tus Favoritos</h2>
      <ul>
        {favoritos.map((dj) => (
          <li key={dj.id}>
            {dj.name} {dj.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favoritos;
