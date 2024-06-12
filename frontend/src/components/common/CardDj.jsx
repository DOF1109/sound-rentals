import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import darkTheme from "../../styles/themeConfig";
import { updateFavoriteStatus } from "../../api/djsApi";
import FavoriteButton from "./Favorite";
import { useState } from "react";

const CardDj = ({ id, image, name, lastname, styles }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    const updatedStatus = !isFavorite;
    const value = {
      id: null,
      dj: id,
      isFavorite: updatedStatus,
      usuario: 1,
    };
    const response = await updateFavoriteStatus(value);
    if (response.status === 201) {
      setIsFavorite(updatedStatus);
    } else {
      console.error("Error al actualizar el estado de favorito");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        border: 1,
        borderRadius: 3,
        mx: "auto",
        height: "350px",
      }}
    >
      
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems:"self-start"
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="DJ image"
          />
          <CardContent sx={{width: "100%", height:"100%"}}>
            <Link to={`/dj-detail/${id}`} style={{ textDecoration: "none" }}>
              <Typography gutterBottom variant="h6" color={darkTheme.palette.text.primary}>
                {`${name}  ${lastname}`}
              </Typography>
            </Link>
            <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
            {styles.map((estilo, index) => {
              return (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  component="div"
                >
                  {estilo.style}
                </Typography>
              );
            })}
          </CardContent>
        </CardActionArea>
    </Card>
  );
};

export default CardDj;
