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
// import ImageMasonry from "../common/ImageMasonry";
import { getDj } from "../../api/djsApi.js";
import { useEffect, useState } from "react";

const DjDetail = () => {
  const { id } = useParams();
  const [dj, setDj] = useState();

  const loadDj = async () => {
    const data = await getDj(id);
    if (data) setDj(data);
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
            gap={2}
          >
            <Box
              component="img"
              src={dj.urlPic}
              alt="Foto de perfil del Dj"
              sx={{ maxWidth: { xs: "200px", md: "300px" } }}
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
                      <Typography key={estilo.style}>{estilo.style}</Typography>
                    );
                  })}
                  <Typography variant="body2" pt={3} pb={1}>
                    Sobre el DJ
                  </Typography>
                  <Typography variant="body2">{dj.comment}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={{ mx: "auto", mb: 1 }}>
                    <Link className="clear-link light-text" to="/signin">
                      RESERVAR
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <ImageMasonry /> */}
            Masonry
          </Grid>
        </Grid>
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </Container>
  );
};

export default DjDetail;
