import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCategoryCarousel from "../common/EmblaCarousel/EmblaCategoryCarousel";
import EmblaRecommendedCarousel from "../common/EmblaCarousel/EmblaRecommendedCarousel";
import theme from "../../styles/themeConfig";
import { getCategories } from "../../api/categoriesApi.js";
import { getTopDjs } from "../../api/djsApi.js";

const OPTIONS = { loop: true };

const Home = () => {
  const [categories, setCategories] = useState();
  const [topDjs, setTopDjs] = useState([]);

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  const loadTopDjs = async () => {
    const data = await getTopDjs();
    if (data) setTopDjs(data);
  };

  useEffect(() => {
    loadCategories();
    loadTopDjs();
  }, []);

  if (!categories || !topDjs) {
    return (
      <Typography variant="h5" ml={5} mt={3}>
        Cargando...
      </Typography>
    );
  }

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
          <EmblaRecommendedCarousel slides={topDjs} options={OPTIONS} />
        </Container>
      </Box>
    </>
  );
};

export default Home;
