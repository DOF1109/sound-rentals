import { Container, Grid } from "@mui/material";
import SearchInput from "../common/SearchInput";
import CardDj from "../common/CardDj";
import djImg1 from "../../assets/images/image-2.webp";
import djImg2 from "../../assets/images/image-2.webp";
import { useEffect, useState } from "react";
import { getDjs } from "../../api/djsApi.js";
import { getCategories } from "../../api/categoriesApi.js";

const djsArray = [
  { image: djImg1, name: "DJ 1", genre: "Electronic" },
  { image: djImg1, name: "DJ 3", genre: "Urbana" },
  { image: djImg2, name: "DJ 4", genre: "Retro clasica" },
  { image: djImg1, name: "DJ 5", genre: "Pop comercial" },
  { image: djImg2, name: "DJ 6", genre: "Urbana" },
  { image: djImg1, name: "DJ 7", genre: "Retro clasica" },
  { image: djImg2, name: "DJ 8", genre: "Electronic" },
  { image: djImg1, name: "DJ 9", genre: "Urbana" },
];

const DJs = () => {
  //   const [djs, setDjs] = useState([]);
  //   const loadDjs = async () => {
  //     const data = await getDjs();
  //     if (data) setDjs(data);
  //   };

  //   useEffect(() => {
  //     loadDjs();
  //   }, []);

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Container component="section">
      <SearchInput
        categories={categories.map((category) => {
          return category.style;
        })}
      />
      <Grid container spacing={6} pb={4}>
        {djsArray.map((dj, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <CardDj />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DJs;
