import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardDj = ({ image, name, lastname, styles }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        border: 1,
        borderRadius: 2,
        mx: "auto",
      }}
      onClick={() => {
        console.log("Detalle del DJ");
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt="DJ image" />
        <CardContent>
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
    </Card>
  );
};

export default CardDj;
