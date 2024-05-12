import { Box, Container, Typography } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCarousel from "../common/EmblaCarousel/EmblaCarousel";
import "../../styles/embla.css";
import Img1 from "../../assets/images/image-1-sr.webp";
import Img2 from "../../assets/images/image-2.webp";
import Img3 from "../../assets/images/image-3.webp";
import theme from "../../styles/themeConfig";

const OPTIONS = { loop: true };

const images = [Img1, Img2, Img3];

const Home = () => {
  return (
    <>
      <Box component="section" className="gradientBox" pt={1} pb={4}>
        <Container>
          <SearchInput />
          <EmblaCarousel slides={images} options={OPTIONS} />
        </Container>
      </Box>
      <Box
        component="section"
        sx={{ background: theme.palette.light.main, py: 4 }}
      >
        <Container>
          <Typography
            component="h2"
            variant="h4"
            color={theme.palette.background.default}
            className="underline-text"
          >
            Recomendados
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
