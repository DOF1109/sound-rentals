import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory } from "../../api/categoriesApi.js";

const AddCategory = () => {
  const formik = useFormik({
    initialValues: {
      style: "",
    },
    onSubmit: async (data) => {
      let res = await add(data);
      if (res) formik.resetForm();
    },
    validationSchema: Yup.object({
      style: Yup.string()
        .required("Complete este campo")
        .max(25, "No debe ser demasiado largo"),
    }),
    validateOnChange: false,
  });

  const { handleChange, handleSubmit, errors, values, resetForm } = formik;

  const add = async (data) => {
    try {
      const response = await addCategory(data);
      if (response.status === 201) {
        toast.success("Estilo agregado exitosamente!");
        return true;
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

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
        py={5}
      >
        <Grid item xs={12} sm={9} lg={8} mt={3} mb={2}>
          <TextField
            name="style"
            label="Estilo"
            variant="outlined"
            onChange={handleChange}
            value={values.style}
            error={!!errors.style}
            helperText={errors.style}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={8} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Registrar estilo
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

export default AddCategory;
