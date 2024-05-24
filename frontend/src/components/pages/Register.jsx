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
import { AuthContext } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
  
  const Register = () => {
    //const { handleName } = useContext(AuthContext)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const handlechangeName = (e)=> {
        handleName(e.target.value)
    } 

    const handlechange = (e)=> {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const res = await signUp(userCredentials)
        //Aqui tambien voy a usar uid que viene el la raspuesta (res) para crear un documento en la colleccion user
        //con el rol del usuario
        if(res.user.uid) {
            //Con el metodo setDoc (me permite agrgar un documento(registro) y setear yo el id) distinto al metodo addDoc
            //que lo agrega sin yo poder modificar
            await setDoc(doc(db, "users", res.user.uid), {rol: 'commonusr'})
            alert('Usuario creado exitosamente!...')
        }else {
            alert('hubo un problema!...')
        }
        
        navigate('/signin')
    } 
  
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
              <TextField name="nombre" label="Nombre" fullWidth onBlur={handlechangeName}/>
            </Grid>

            <Grid item xs={10} md={12}>
              <TextField name="email" label="Email" fullWidth onChange={handlechange}/>
            </Grid>

            <Grid item xs={10} md={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password" onChange={handlechange}
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
                  name="confirmPassword" onChange={handlechange}
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
