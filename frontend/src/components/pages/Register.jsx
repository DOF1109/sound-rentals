import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../firebaseConfig";
// import { AuthContext } from "../../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import swal from "sweetalert";
import { postUser } from "../../api/userApi";

const Register = () => {
  //   const { data } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [nameUser, setNameUser] = useState();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlechangeName = (e) => {
    setNameUser(e.target.value);
  };

  const handlechange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    const userData = {
      nombre: nameUser,
      email: userCredentials.email,
    };
    const data = await postUser(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eRegexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const eRegexPass = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (
      userCredentials.email.length > 5 &&
      eRegexEmail.test(userCredentials.email) &&
      eRegexPass.test(userCredentials.password)
    ) {
      if (userCredentials.password === userCredentials.confirmPassword) {
        const res = await signUp(userCredentials);
        //Aqui tambien voy a usar uid que viene el la raspuesta (res) para crear un documento en la colleccion user
        //con el rol del usuario
        if (res.user.uid) {
          //Con el metodo setDoc (me permite agrgar un documento(registro) y setear yo el id) distinto al metodo addDoc
          //que lo agrega sin yo poder modificar
          await setDoc(doc(db, "users", res.user.uid), { rol: "commonusr" });
          swal({
            title: "SoundRentals",
            text: "Usuario creado exitosamente!...",
            //icon: successs - error - warning - info
            icon: "successs",
            button: "Ingresar",
            //timer: '2000'
          });
          registerUser();
        } else {
          alert(
            "hubo un problema al intentar registrar, vuelva a intentarlo!..."
          );
        }
        navigate("/signin");
      } else {
        swal({
          title: "SoundRentals",
          text: "Las contraseñas ingresadas no coinciden, vuelva a intentarlo!...",
          //icon: successs - error - warning - info
          icon: "warning",
          button: "Aceptar",
          //timer: '2000'
        });
      }
    } else {
      swal({
        title: "SoundRentals",
        text: "Los datos de email o contraseña no cumplen con los requisitos de validación, vuelva a intentarlo!...",
        //icon: successs - error - warning - info
        icon: "warning",
        button: "Aceptar",
        //timer: '2000'
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: theme.palette.secondary.main,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          // alignItems="center"
          justifyContent={"center"}
        >
          <Grid item xs={10} md={12}>
            <TextField
              name="nombre"
              label="Nombre"
              fullWidth
              onChange={handlechangeName}
            />
          </Grid>

          <Grid item xs={10} md={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              onChange={handlechange}
            />
          </Grid>

          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña - Mínima de 8 letras, con al menos un símbolo, letras
                mayúsculas y minúsculas y un número.
              </InputLabel>

              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlechange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>

          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handlechange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar contraseña"
              />
            </FormControl>
          </Grid>

          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={7}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                }}
              >
                Registrarme
              </Button>
            </Grid>
            <Grid item xs={10} md={7}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/signin")}
                type="button"
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
