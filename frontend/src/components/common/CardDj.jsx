import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NoMealsOutlined, Star, StarBorder } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { addFavoritos, getFavoritos, deleteFavorito } from "../../api/favoritosApi";
import darkTheme from "../../styles/themeConfig";
import UserInfo from "../pages/UserInfo";

const CardDj = ({ id, image, name, lastname, styles }) => {
  const [isFavorito, setIsFavorito] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritosFromBackend = await getFavoritos();
        console.log(favoritosFromBackend)
        const isDjInFavoritos = favoritosFromBackend.find((dj)=>dj.id===id && dj.favorite==true);
        console.log(`${name} ${isDjInFavoritos}`)
        setIsFavorito(isDjInFavoritos?false:true);
      } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error);
      }
    };

    fetchFavoritos();
  }, []); 

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();
    try {
      if (isFavorito) {
        const response = await deleteFavorito(id);
        if (response.status === 200 || response.status === 204) {
          setIsFavorito(false);
          setSnackbarOpen(true); 
          setSnackbarMessage("DJ eliminado de favoritos");
          console.log("Eliminado correctamente")
        } else {
          console.error("Error al eliminar de favoritos:", response);
        }
      } else {
        
        const djData = {
          isFavorite: true, 
          dj: id, 
          usuario: 1, 
        };
  
        const response = await addFavoritos(djData);
        if (response.status === 201) {
          setIsFavorito(true);
          setSnackbarOpen(true); 
          setSnackbarMessage("DJ agregado a favoritos");
          console.log("Agregado correctamente")

        } else {
          console.error("Error al agregar a favoritos:", response);
        }
      }
    } catch (error) {
      console.error("Error al agregar/eliminar de favoritos:", error);
    }
};
  

  const handleFavoriteMouseEnter = (event) => {
    event.stopPropagation();
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          border: 1,
          borderRadius: 3,
          mx: "auto",
          height: "350px",
          position: "relative",
        }}
      >
        <CardActionArea
          component={Link}
          to={`/dj-detail/${id}`}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "self-start"
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="DJ image"
          />
          <CardContent sx={{ width: "100%", height: "100%", position: "relative" }}>
            <Typography gutterBottom variant="h6" color={darkTheme.palette.text.primary}>
              {`${name}  ${lastname}`}
            </Typography>
            {styles.map((estilo, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                component="div"
              >
                {estilo.style}
              </Typography>
            ))}
          </CardContent>
        </CardActionArea>
        <IconButton
          onClick={handleFavoriteClick}
          onMouseEnter={handleFavoriteMouseEnter}
          sx={{ position: "absolute", top: 212, right: 15, zIndex: 1 }}
        >
          {isFavorito ? (
            <Star color="primary" />
          ) : (
            <StarBorder color="primary" />
          )}
        </IconButton>
      </Card>
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
    </>
  );
};

export default CardDj;


