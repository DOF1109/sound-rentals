import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CardDj = ({ id, image, name, lastname, styles }) => {
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
      <Link to={`/dj-detail/${id}`} style={{ textDecoration: "none" }}>
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
            <Typography gutterBottom variant="h6">
              {`${name}  ${lastname}`}
            </Typography>
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
      </Link>
    </Card>
  );
};

export default CardDj;
