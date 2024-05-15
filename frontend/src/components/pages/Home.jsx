import { Box, Container, Typography } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCategoryCarousel from "../common/EmblaCarousel/EmblaCategoryCarousel";
import EmblaRecommendedCarousel from "../common/EmblaCarousel/EmblaRecommendedCarousel";
import theme from "../../styles/themeConfig";
import { getCategories } from "../../api/categoriesApi.js";
import { useEffect, useState } from "react";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Home = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Box component="section" className="gradientPrimaryBox" pt={1} pb={4}>
        <Container>
          <SearchInput
            categories={categories.map((category) => {
              return category.style;
            })}
          />

          <EmblaCategoryCarousel
            slides={categories.map((category) => {
              return category.url;
            })}
            options={OPTIONS}
          />
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
