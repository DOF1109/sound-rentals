import { Box, Container, Grid } from "@mui/material";
import SearchInput from "../common/SearchInput";
import CardDj from "../common/CardDj";
import djImg1 from "../../assets/images/image-2.webp";
import djImg2 from "../../assets/images/image-2.webp";

const djs = [
  { image: djImg1, name: "DJ 1", genre: "Electronic" },
  { image: djImg1, name: "DJ 3", genre: "Urbana" },
  { image: djImg2, name: "DJ 4", genre: "Retro clasica" },
  { image: djImg1, name: "DJ 5", genre: "Pop comercial" },
  { image: djImg2, name: "DJ 6", genre: "Urbana" },
  { image: djImg1, name: "DJ 7", genre: "Retro clasica" },
  { image: djImg2, name: "DJ 8", genre: "Electronic" },
  { image: djImg1, name: "DJ 9", genre: "Urbana" },
  { image: djImg2, name: "DJ 10", genre: "Retro clasica" },
];

const DJs = () => {
  return (
    <Box>
      <Container>
        <SearchInput />
        <Grid container spacing={4}>
          {djs.map((dj, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CardDj image={dj.image} name={dj.name} genre={dj.genre} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DJs;
