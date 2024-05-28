import {
  Box,
  Container,
  Grid,
  Pagination,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import CardDj from "../common/CardDj";
import { useEffect, useState } from "react";
import { getDjs } from "../../api/djsApi.js";
import { getCategories } from "../../api/categoriesApi.js";

const DJs = () => {
  const [categories, setCategories] = useState([]);
  const [djs, setDjs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageDjs, setPageDjs] = useState([]);

  // Para saber el ancho de pantalla
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // En base al ancho de pantalla defino cantidad de items en la vista
  const itemsPerPage = isMd ? 9 : 10;

  const loadDjs = async () => {
    const data = await getDjs();
    if (data) {
      setDjs(data);
      setPageDjs(data.slice(0, itemsPerPage));
    }
  };

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    setPageDjs(djs.slice((value - 1) * itemsPerPage, value * itemsPerPage));
  };

  useEffect(() => {
    loadCategories();
    loadDjs();
  }, []);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-product");
  };

  return (
    <Container component="section">
      <SearchInput
        categories={categories.map((category) => {
          return category.style;
        })}
      />
      <Grid container spacing={4} pb={2} justifyContent="right">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Agregar
        </Button>
      </Grid>
      <Grid container spacing={6} pb={1} justifyContent="center">
        {pageDjs.map((dj, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardDj
              image={dj.urlPic}
              name={dj.name}
              lastname={dj.lastname}
              styles={dj.estilos}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" p={3}>
        <Pagination
          count={Math.ceil(djs.length / itemsPerPage)}
          color="primary"
          page={page}
          onChange={handlePageChange}
          size="large"
        />
      </Box>
    </Container>
  );
};

export default DJs;
