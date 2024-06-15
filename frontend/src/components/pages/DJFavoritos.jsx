import {
  Box,
  Container,
  Grid,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchInput from "../common/SearchInput";
import CardDj from "../common/CardDj";
import { useContext, useEffect, useState } from "react";
import { getDjFavoritos } from "../../api/djsApi.js";
import { getCategories } from "../../api/categoriesApi.js";
import Loader from "../common/Loader.jsx";
import { AuthContext } from "../../context/AuthContext";

const DJFavoritos = () => {
  const [categories, setCategories] = useState([]);
  const [djs, setDjs] = useState();
  const [page, setPage] = useState(1);
  const [pageDjs, setPageDjs] = useState([]);
  const {userDb,djFavorites} = useContext(AuthContext);

  // Para saber el ancho de pantalla
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // En base al ancho de pantalla defino cantidad de items en la vista
  const itemsPerPage = isMd ? 9 : 10;

  const loadDjs = async () => {
    if(userDb){
      const djFavoritesUser = djFavorites.filter((f)=>f.favorite==true && f.usuario.id==userDb.id);
      setPage(page);
      setDjs(djFavoritesUser);
      setPageDjs(djFavoritesUser.slice(0, itemsPerPage));
      setPageDjs(djFavoritesUser.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }

  };

  const handlePageChange = (e, value) => {
    setPage(value);
    setPageDjs(djs.slice((value - 1) * itemsPerPage, value * itemsPerPage));
  };

  useEffect(() => {
    loadDjs();
  }, [userDb,djFavorites]);

  if (!djs) return <Loader />;

  return (
    <Container component="section">
      <SearchInput
        categories={categories.map((category) => {
          return category.style;
        })}
      />
      <Grid container spacing={6} pb={1} justifyContent="center">
        {pageDjs.map((dj, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardDj
              id={dj.dj.id}
              image={dj.dj.urlPic}
              name={dj.dj.name}
              lastname={dj.dj.lastname}
              styles={dj.dj.estilos}
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
        />
      </Box>
    </Container>
  );
};

export default DJFavoritos;
