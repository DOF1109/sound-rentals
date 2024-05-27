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
// import ImageMasonry from "../common/ImageMasonry";

const DjDetail = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>Imagen de perfil</Box>
          <Box>
            <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
              <CardContent>
                <Typography variant="h5">NOMBRE DEL DJ</Typography>
                <Typography py={3}>PRECIO: $</Typography>
                <Typography>CATEGORIA:</Typography>
                <Typography variant="body2" pt={3} pb={1}>
                  Sobre el DJ
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem dolores culpa illum doloribus vitae debitis
                  veniam voluptatem, ex ipsam ipsum earum nihil praesentium
                  repudiandae minima tenetur officiis distinctio labore id.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" sx={{ mx: "auto", mb: 1 }}>
                  RESERVAR
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
    </Container>
  );
};

export default DjDetail;
