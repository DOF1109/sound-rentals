import { useEffect, useState, useRef } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCategoryCarousel from "../common/EmblaCarousel/EmblaCategoryCarousel";
import EmblaRecommendedCarousel from "../common/EmblaCarousel/EmblaRecommendedCarousel";
import theme from "../../styles/themeConfig";
import { getCategories } from "../../api/categoriesApi.js";
import { getTopDjs, getDjs } from "../../api/djsApi.js";
import Loader from "../common/Loader.jsx";

const OPTIONS = { loop: true };

const Home = () => {
  const resultsRef = useRef(null);
  const [categories, setCategories] = useState();
  const [topDjs, setTopDjs] = useState();
  const [djs, setDjs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageDjs, setPageDjs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const itemsPerPage = isMd ? 9 : 10;

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  const loadTopDjs = async () => {
    const data = await getTopDjs();
    if (data) setTopDjs(data);
  };

  const loadDjs = async () => {
    const data = await getDjs();
    if (data) {
      const filteredDjs = selectedCategory
        ? data.filter(dj => dj.estilos.some(estilo => estilo.style === selectedCategory))
        : data;
      setDjs(filteredDjs);
      setPageDjs(filteredDjs.slice(0, itemsPerPage));
    }
  };

  const handleSearchAndScroll = () => {
    if (resultsRef.current) {
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  };

  useEffect(() => {
      handleSearchAndScroll();
    
    loadDjs();
    loadCategories();
    loadTopDjs();
  }, []);

  if (!categories || !topDjs) return <Loader />;

  return (
    <>
      <Box component="section" className="gradientPrimaryBox" pt={1} pb={4}>
        <Container>
        <SearchInput
          itemsPerPage={itemsPerPage}
          djs={djs}
          setDjs={setDjs}
          setPage={setPage}
          setPageDjs={setPageDjs}
          categories={categories}
          onSearch={handleSearchAndScroll}
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
      {pageDjs.length === 0 ? (
        null
      ) : (
        <Box
        component="section"
        py={4}
        sx={{ background: theme.palette.light.main, py: 6 }}
        ref={resultsRef}
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
            Tu busqueda
          </Typography>
          <EmblaRecommendedCarousel slides={djs} options={OPTIONS} />
        </Container>
      </Box>
      )}
    </>
  );
};

export default Home;