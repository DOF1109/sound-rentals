import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import djImg1 from "../../assets/images/image-2.webp";

const CardDj = ({ image, name, lastname, styles }) => {
  return (
    <Card 
      sx={{ maxWidth: 345, border: 1, borderRadius: 2 }}
      onClick={() => {console.log("Detalle del DJ");}}  
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          //   image={image}
          image={djImg1}
          alt="DJ image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {/* {`${name}  ${lastname}`} */}
            Nombre Apellido
          </Typography>
          {/* {styles.map( style => {
            <Typography key={style} variant="body2" color="text.secondary">
              {style.style}
            </Typography>  
          })} */}
          <Typography variant="body2" color="text.secondary">
            Electronica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardDj;
