import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCategories } from "../../api/categoriesApi.js";
import { getCharacteristics } from "../../api/characteristicsApi.js";
import { addDj } from "../../api/djsApi.js";
import { uploadToFirebase } from "../../firebaseConfig";
import { getCiudades } from "../../api/ciudadesApi.js";

const AddService = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

  // Refs para los inputs de archivos
  const profileImageRef = useRef(null);
  const imagesRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      ciudad:"",
      address: "",
      password: "",
      dni: "",
      charge: "",
      comment: "",
      profileImage: "",
      images: [],
      estilos: [],
      caracteristicas:[],
      sample1: "",
      sample2: "",
    },
    onSubmit: async (data) => {
      let res = await add(data);
      if(res){
        formik.resetForm();
        setProfileImage(null);
        setImages([]);
        if (profileImageRef.current) profileImageRef.current.value = "";
        if (imagesRef.current) imagesRef.current.value = "";
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Complete este campo"),
      lastname: Yup.string().required("Complete este campo"),
      email: Yup.string()
        .email("Ingrese un email válido")
        .required("Complete este campo"),
      dni: Yup.string().required("Complete este campo"),
      charge: Yup.number().required("Complete este campo"),
      comment: Yup.string().required("Complete este campo"),
      estilos: Yup.array()
        .min(1, "Seleccione al menos un estilo de música")
        .required("Complete este campo"),
    }),
    validateOnChange: false,
  });

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    setFieldValue,
    resetForm,
  } = formik;

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const downloadURL = await uploadToFirebase(file, `profiles/${file.name}`);
    setProfileImage(downloadURL);
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const downloadURLs = await Promise.all(
      files.map((file) => uploadToFirebase(file, `images/${file.name}`))
    );
    setImages(downloadURLs);
  };

  const add = async (data) => {
    try {
      const response = await addDj({
        ...data,
        urlPic: profileImage,
        urlImg1: images[0],
        urlImg2: images[1],
        urlImg3: images[2],
        urlImg4: images[3],
        urlImg5: images[4],
      });
      if (response.status === 201) {
        toast.success("¡DJ agregado exitosamente!");
        setProfileImage(null);
        setImages([]);
        return true;
      } else {
        toast.error(`Error: ${response.message}`);
        return false;
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  const loadCharacteristics = async () => {
    const data = await getCharacteristics();
    if (data) setCharacteristics(data);
  };

  const loadCiudades = async () => {
    const data = await getCiudades();
    if (data) setCiudades(data);
  };

  useEffect(() => {
    loadCategories();
    loadCharacteristics();
    loadCiudades();
  }, []);

  return (
    <Box component="section">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
        maxWidth="md"
        mx="auto"
        pt={5}
        pb={15}
      >
        <Grid item xs={12} sm={9} lg={8} mt={3}>
          <TextField
            name="name"
            label="Nombre"
            variant="outlined"
            onChange={handleChange}
            value={values.name}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="lastname"
            label="Apellido"
            variant="outlined"
            onChange={handleChange}
            value={values.lastname}
            error={!!errors.lastname}
            helperText={errors.lastname}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={values.email}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="dni"
            label="DNI"
            type="number"
            variant="outlined"
            onChange={handleChange}
            value={values.dni}
            error={!!errors.dni}
            helperText={errors.dni}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="phone"
            label="Teléfono"
            variant="outlined"
            onChange={handleChange}
            value={values.phone}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <FormControl fullWidth>
            <InputLabel>Ciudad</InputLabel>
            <Select
              name="ciudad"
              value={values.ciudad}
              onChange={(event) => setFieldValue("ciudad", event.target.value)}
              error={!!errors.ciudad}
            >
              {ciudades.map((ciudad, index) => (
                <MenuItem key={index} value={ciudad.id}>
                  {ciudad.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="address"
            label="Dirección"
            variant="outlined"
            onChange={handleChange}
            value={values.address}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="charge"
            label="Precio"
            variant="outlined"
            type="number"
            onChange={handleChange}
            value={values.charge}
            error={!!errors.charge}
            helperText={errors.charge}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="comment"
            label="Comentario"
            variant="outlined"
            onChange={handleChange}
            value={values.comment}
            error={!!errors.comment}
            helperText={errors.comment}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="sample1"
            label="Muestra 1"
            variant="outlined"
            onChange={handleChange}
            value={values.sample1}
            error={!!errors.sample1}
            helperText={errors.sample1}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="sample2"
            label="Muestra 2"
            variant="outlined"
            onChange={handleChange}
            value={values.sample2}
            error={!!errors.sample2}
            helperText={errors.sample2}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <FormControl fullWidth>
            <InputLabel>Estilo/Categoría de Música</InputLabel>
            <Select
              name="estilos"
              value={values.estilos}
              onChange={(event) => setFieldValue("estilos", event.target.value)}
              error={!!errors.estilos}
              multiple
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  {category.style}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <FormControl fullWidth>
            <InputLabel>Caracteristicas</InputLabel>
            <Select
              name="caracteristicas"
              value={values.caracteristicas}
              onChange={(event) => setFieldValue("caracteristicas", event.target.value)}
              error={!!errors.caracteristicas}
              multiple
            >
              {characteristics.map((characteristic, index) => (
                <MenuItem key={index} value={characteristic.id}>
                  {characteristic.caracteristica}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <InputLabel sx={{ pb: 1 }}>Imagen de Perfil</InputLabel>
          <input
            name="profileImage"
            type="file"
            onChange={handleProfileImageChange}
            ref={profileImageRef}
          />
          <InputLabel sx={{ pt: 4, pb: 1 }}>Imágenes (Hasta 5)</InputLabel>
          <input
            name="images"
            type="file"
            multiple
            onChange={handleImagesChange}
            ref={imagesRef}
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Registrar DJ
          </Button>
        </Grid>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
};

export default AddService;
