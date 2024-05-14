import { Box, Container, Typography } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCategoryCarousel from "../common/EmblaCarousel/EmblaCategoryCarousel";
import EmblaRecommendedCarousel from "../common/EmblaCarousel/EmblaRecommendedCarousel";
import Img1 from "../../assets/images/image-1-sr.webp";
import Img2 from "../../assets/images/image-2.webp";
import Img3 from "../../assets/images/image-3.webp";
import theme from "../../styles/themeConfig";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const images = [Img1, Img2, Img3];

const Home = () => {
  return (
    <>
      <Box component="section" className="gradientPrimaryBox" pt={1} pb={4}>
        <Container>
          <SearchInput />
          <EmblaCategoryCarousel slides={images} options={OPTIONS} />
        </Container>
      </Box>
      <Box
        component="section"
        py={4}
        sx={{ background: theme.palette.light.main, py: 6 }}
      >
        <Container>
          <Typography
            component="h2"
            variant="h5"
            fontWeight={600}
            color={theme.palette.background.default}
            mb={6}
            className="underline-text"
          >
            RECOMENDADOS
          </Typography>
          <EmblaRecommendedCarousel slides={SLIDES} options={OPTIONS} />
        </Container>
      </Box>
    </>
  );
};

export default Home;
