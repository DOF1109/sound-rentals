import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { Link, useNavigate } from "react-router-dom";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";

import { db, loginGoogle, onSignIn } from "../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const { handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  //const {email, password} = userCredentials()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await onSignIn(userCredentials);
      if (res.user) {
        //Capturamos el UID del usuario creado
        const userCollection = collection(db, "users");
        const userRef = doc(userCollection, res.user.uid);
        //En userDoc guardo el usuario de la base de datos
        const userDoc = await getDoc(userRef);

        let finalyUser = {
          email: res.user.email,
          rol: userDoc.data().rol,
        };
        //Aqui paso al context AuthContext los datos del usuario 'finalyUser'
        handleLogin(finalyUser);
        navigate("/");
      } else {
        alert(
          "Usted no es un usuario registrado o sus datos son incorrectos!..."
        );
      }
    } catch (error) {
      swal({
        title: "SoundRentals",
        text: "Usted no es un usuario registrado o sus datos de acceso son incorrectos, vuelva a intentar...",
        //icon: successs - error - warning - info
        icon: "warning",
        button: "Aceptar",
        //timer: '2000'
      });
    }
  };

  const loginWithGoogle = async () => {
    let res = await loginGoogle();
    let finalyUser = {
      email: res.user.email,
      rol: "commonusr",
    };
    handleLogin(finalyUser);
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: "sm",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mx: "auto",
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
              name="email"
              label="Email"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
          <Link
            to="/forgotPass"
            className="clear-link"
            style={{ color: "steelblue", marginTop: "10px" }}
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={5}>
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={10} md={5}>
              <Tooltip title="ingresa con google">
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  type="button"
                  onClick={loginWithGoogle}
                  fullWidth
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Ingresa con google
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={10} md={8}>
              <Typography
                color={"secondary.primary"}
                variant={"h6"}
                mt={1}
                align="center"
              >
                ¿Aun no tienes cuenta?
              </Typography>
            </Grid>

            <Grid item xs={10} md={5}>
              <Tooltip title="ir al registro">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/register")}
                  type="button"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Registrate
                </Button>
              </Tooltip>
            </Grid>

            <Grid item xs={10} md={5}>
              <Tooltip title="volver al inicio">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/")}
                  type="button"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Ir al Home
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SignIn;
