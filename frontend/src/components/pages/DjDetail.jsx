import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ImageMasonry from "../common/ImageMasonry";
import { getDj } from "../../api/djsApi.js";
import { useEffect, useState } from "react";

const arrayImagenesHard = [
  "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  ,
  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
  ,
  "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  ,
  "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
  ,
  "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
  ,
];

const DjDetail = () => {
  const { id } = useParams();
  const [dj, setDj] = useState();
  const [djImages, setDjImages] = useState();

  const imagesDj = () => {
    const arrayImg = [];
    for (let i = 1; i <= 5; i++) {
      const imgKey = `urlImg${i}`;
      arrayImg.push(dj[imgKey]);
    }
    return arrayImg;
  };

  const loadDj = async () => {
    const data = await getDj(id);
    if (data) {
      setDj(data);
      //   setDjImages(imagesDj());
      setDjImages(arrayImagenesHard);
    }
  };

  useEffect(() => {
    loadDj();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {dj ? (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Box
              component="img"
              src={dj.urlPic}
              alt="Foto de perfil del Dj"
              borderRadius={3}
              sx={{ maxWidth: "200px" }}
            />
            <Box>
              <Card
                variant="outlined"
                sx={{ borderRadius: 3, p: 1, minWidth: "300px" }}
              >
                <CardContent>
                  <Typography variant="h5">{`${dj.name} ${dj.lastname}`}</Typography>
                  <hr />
                  <Typography py={3}>{`PRECIO: $ ${dj.charge}`}</Typography>
                  <Typography>CATEGORIA:</Typography>
                  {dj.estilos.map((estilo) => {
                    return (
                      <Typography
                        key={estilo.style}
                        variant="body2"
                        pl={1}
                      >{`* ${estilo.style}`}</Typography>
                    );
                  })}
                  <Typography variant="body2" pt={3} pb={1}>
                    Sobre el DJ
                  </Typography>
                  <Typography variant="body2" pl={1}>
                    {dj.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Card
              variant="outlined"
              sx={{ borderRadius: 3, p: 2, minWidth: "200px" }}
            >
              <CardContent sx={{ pb: 0 }}>
                <ImageMasonry images={djImages} />
              </CardContent>
              <CardActions>
                <Button variant="contained" sx={{ width: "100%", mb: 1 }}>
                  Ver más
                </Button>
              </CardActions>
            </Card>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", my: 2 }}
            >
              <Link className="clear-link light-text" to="/signin">
                RESERVAR
              </Link>
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5">Cargando...</Typography>
      )}
    </Container>
  );
};

export default DjDetail;
