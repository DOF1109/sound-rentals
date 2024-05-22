import { Box, Button, Grid, TextField, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddService = () => {
  const { handleChange, handleSubmit, errors, values, setFieldValue } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      charge: "",
      comment: "",
      profileImage: null,
      images: [],
      musicStyle: "",
    },
    onSubmit: (data) => {
      addDj(data);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Complete este campo"),
      lastName: Yup.string().required("Complete este campo"),
      email: Yup.string().email("Ingrese un email válido").required("Complete este campo"),
      password: Yup.string().required("Complete este campo"),
      charge: Yup.number().required("Complete este campo"),
      comment: Yup.string().required("Complete este campo"),
      musicStyle: Yup.string().required("Complete este campo"),
    }),
    validateOnChange: false,
  });

  const addDj = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    console.log(data)
  };

  return (
    <Box component="section">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12} sm={9} lg={8} mt={3}>
          <TextField
            name="firstName"
            label="Nombre"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="lastName"
            label="Apellido"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <TextField
            name="password"
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
            error={!!errors.comment}
            helperText={errors.comment}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <InputLabel>Imagen de Perfil</InputLabel>
          <input
            name="profileImage"
            type="file"
            onChange={(e) => setFieldValue('profileImage', e.target.files[0])}
            required
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <InputLabel>Imágenes (Hasta 5)</InputLabel>
          <input
            name="images"
            type="file"
            multiple
            onChange={(e) => setFieldValue('images', e.target.files)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8}>
          <FormControl fullWidth>
            <InputLabel>Estilo/Categoría de Música</InputLabel>
            <Select
              name="musicStyle"
              value={values.musicStyle}
              onChange={handleChange}
              error={!!errors.musicStyle}
            >
              <MenuItem value={"electronic"}>Electronic</MenuItem>
              <MenuItem value={"hip-hop"}>Hip-Hop</MenuItem>
              <MenuItem value={"rock"}>Rock</MenuItem>
              <MenuItem value={"pop"}>Pop</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={9} lg={8} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", borderRadius: "50px" }}
          >
            Agregar DJ
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
        transition="Flip"
      />
    </Box>
  );
};

export default AddService;
