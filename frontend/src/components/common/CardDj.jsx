import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import darkTheme from "../../styles/themeConfig";
import { updateFavoriteStatus,getDjFavoritos,deleteFavorito } from "../../api/djsApi";
import FavoriteButton from "./Favorite";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const CardDj = ({ id, image, name, lastname, styles}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [idFavorite, setIdFavorite] = useState(null);
  const { userDb, djFavorites,loadDjsFavorites} = useContext(AuthContext);

  const toggleFavorite = async () => {
    const updatedStatus = !isFavorite;

    const value = {
      dj: id,
      usuario: userDb.id,
    };

    let response = undefined
    if(updatedStatus){
      response = await updateFavoriteStatus(value);
    }
    else{
      response = await deleteFavorito(idFavorite);
    }
    
    if (response.status === 201 || response.status === 200) {
      setIsFavorite(updatedStatus);
      loadDjsFavorites();
    } else {
      console.error("Error al actualizar el estado de favorito");
    }
  };

  useEffect(()=>{
    if(djFavorites.length==0 || !userDb) return; 

    const favoriteCheck = djFavorites.some((f)=>
    f.dj.id==id && f.usuario.id==userDb.id && f.favorite==true)

    if(favoriteCheck){
      let dj = djFavorites.find((f)=>
      f.dj.id===id && f.usuario.id===userDb.id && f.favorite)
      setIdFavorite(dj.id)
    }

    setIsFavorite(favoriteCheck);
  },[userDb,djFavorites,id])


  return (
    <Card
      sx={{
        maxWidth: 300,
        border: 1,
        borderRadius: 3,
        mx: "auto",
        height: "350px",
        position:"relative"
      }}
    >
        <Box
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
            <Box sx={{display: "flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
              <Link to={`/dj-detail/${id}`} style={{ textDecoration: "none" }}>
                <Typography gutterBottom variant="h6" color={darkTheme.palette.text.primary}>
                  {`${name}  ${lastname}`}
                </Typography>
              </Link>
              {userDb && <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />}
            </Box>
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
        </Box>
        
    </Card>
  );
};

export default CardDj;
