import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import darkTheme from "../../styles/themeConfig";
import { updateFavoriteStatus,getDjFavoritos,deleteFavorito } from "../../api/djsApi";
import { getUserByEmail } from "../../api/userApi";
import FavoriteButton from "./Favorite";
import { useEffect, useState } from "react";

const CardDj = ({ id, image, name, lastname, styles }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [idFavorite, setIdFavorite] = useState(null);
  const [userData,setUserData] = useState(null);

  const toggleFavorite = async () => {
    const updatedStatus = !isFavorite;

    const value = {
      dj: id,
      usuario: userData.id,
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
    } else {
      console.error("Error al actualizar el estado de favorito");
    }
  };

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritosFromBackend = await getDjFavoritos();
        const isDjInFavoritos = favoritosFromBackend.find((favorito)=>favorito.dj.id===id && favorito.favorite==true && favorito.usuario.id==userData.id);
        if(isDjInFavoritos){
          setIdFavorite(isDjInFavoritos.id);
        }
        setIsFavorite(isDjInFavoritos?true:false);
      } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error);
      }
    };
    
    if(userData){
      fetchFavoritos();
    }
  }, [userData]); 

  useEffect(()=>{
    const getUser = async ()=>{
      let user = JSON.parse(localStorage.getItem('userInfo'));
      let userEmail = user? user.email:undefined;
      if(userEmail){
        const userData = await getUserByEmail(userEmail);
        if(userData){
          setUserData(userData);
        }
      }
    }
    getUser();
  },[])

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
        {userData && <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />}
    </Card>
  );
};

export default CardDj;
