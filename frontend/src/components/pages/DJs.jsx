import {
  Box,
  Container,
  Grid,
  Pagination,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from "@mui/material";
import SearchInput from "../common/SearchAndCalendar";
import CardDj from "../common/CardDj";
import { useEffect, useState } from "react";
import { getDjs, getDjFavoritos } from "../../api/djsApi.js";
import Loader from "../common/Loader.jsx";

const DJs = () => {
  const [categories, setCategories] = useState([]);
  const [djs, setDjs] = useState([]);
  const [searchDjs, setSearchDjs] = useState();
  const [page, setPage] = useState(1);
  const [pageDjs, setPageDjs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Para saber el ancho de pantalla
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // En base al ancho de pantalla defino cantidad de items en la vista
  const itemsPerPage = isMd ? 9 : 10;

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredDjs = category
      ? djs.filter(dj => dj.estilos.some(estilo => estilo.style === category))
      : djs;
    setPageDjs(filteredDjs.slice(0, itemsPerPage));
    setPage(1);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    setPageDjs(djs.slice((value - 1) * itemsPerPage, value * itemsPerPage));
  };
  console.log('pagedjs',pageDjs)

  useEffect(() => {
    loadDjs();
  }, [selectedCategory]);

  if (!djs.length) return <Loader />;

  return (
    <Container component="section">
      <SearchInput
      itemsPerPage={itemsPerPage}
      djs={djs}
      setDjs={setSearchDjs}
      setPage={setPage}
      setPageDjs={setPageDjs}
        categories={categories}
      />
            
      <Grid container spacing={6} pb={1} justifyContent="center">
      {pageDjs.length === 0 ? (
        <Box sx={{ marginTop: '2rem' }}>
          <Alert variant="filled" severity="info" sx={{ color: 'white' }}>
            No hay djs con esos filtros
          </Alert>
        </Box>
      ) : (
        <Grid 
        sx={{
          marginTop: '2rem'
        }}
        container spacing={2}>
          {pageDjs.map((dj, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardDj
                id={dj.id}
                image={dj.urlPic}
                name={dj.name}
                lastname={dj.lastname}
                styles={dj.estilos}
              />
            </Grid>
          ))}
        </Grid>
      )}
        
      </Grid>
      <Box display="flex" justifyContent="center" p={3}>
        <Pagination
          count={Math.ceil(djs.length / itemsPerPage)}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default DJs;