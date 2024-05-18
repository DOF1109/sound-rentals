import { Container, Grid } from "@mui/material";
import SearchInput from "../common/SearchInput";
import CardDj from "../common/CardDj";
import { useEffect, useState } from "react";
import { getDjs } from "../../api/djsApi.js";
import { getCategories } from "../../api/categoriesApi.js";

const DJs = () => {
  const [categories, setCategories] = useState([]);
  const [djs, setDjs] = useState([]);

  const loadDjs = async () => {
    const data = await getDjs();
    if (data) setDjs(data);
  };

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    loadCategories();
    loadDjs();
  }, []);

  return (
    <Container component="section">
      <SearchInput
        categories={categories.map((category) => {
          return category.style;
        })}
      />
      <Grid container spacing={6} pb={4} justifyContent="center">
        {djs.map((dj, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CardDj
              image={dj.estilos[0].url}
              name={dj.name}
              lastname={dj.lastname}
              styles={dj.estilos}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DJs;
