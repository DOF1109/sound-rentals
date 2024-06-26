import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/SoundRentals-logo.webp";
import { logOut } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../common/Avatar";

const Header = () => {
  const { handleLogout } = useContext(AuthContext);
  const [user, setUser] = useState({ rol: "", email: "" });
  const [isLogged, setIsLogged] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    handleLogout();
    logOut();
    navigate("/signin");
  };

  const AdminMobileMenuItems = ({ handleClose }) => (
    <>
      <MenuItem onClick={handleClose}>
        <Link className="clear-link" to="/manage-users">
          Admin. usuarios
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link className="clear-link" to="/manage-djs">
          Admin. DJs
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link className="clear-link" to="/manage-characteristics">
          Admin. Caract.
        </Link>
      </MenuItem>
    </>
  );

  const CommonUserMobileMenuItems = ({ handleClose }) => (
    <>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link className="clear-link" to="/djs-favoritos">
          Favoritos
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link className="clear-link" to="/reservations">
          Reservas
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link className="clear-link" to="/user-info">
          Mis datos
        </Link>
      </MenuItem>
    </>
  );

  const NoLoggedMobileMenuItems = ({ handleClose }) => {
    return (
      <>
        <MenuItem onClick={handleClose}>
          <Link className="clear-link" to="/signin">
            Iniciar sesión
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="clear-link" to="/register">
            Registrarse
          </Link>
        </MenuItem>
      </>
    );
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const isLogged = localStorage.getItem("isLogged");

    if (userInfo && userInfo !== "") {
      setUser(JSON.parse(userInfo));
    }
    if (isLogged && isLogged !== "") {
      setIsLogged(JSON.parse(isLogged));
    }
  }, []);

  return (
    <AppBar position="sticky" sx={{ py: 3 }}>
      <Container>
        <Toolbar disableGutters>
          {/* ---------- Mobile menu ---------- */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="clear-link" to="/">
                  Inicio
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="clear-link" to="/djs">
                  Nuestros DJs
                </Link>
              </MenuItem>

              {/* Usuario administrador */}
              {user.rol === import.meta.env.VITE_ADMIN_ROL && (
                <AdminMobileMenuItems handleClose={handleCloseNavMenu} />
              )}

              {/* Usuario común logueado */}
              {user.rol === import.meta.env.VITE_COMMON_ROL && (
                <CommonUserMobileMenuItems handleClose={handleCloseNavMenu} />
              )}

              {/* Usuario sin loguearse */}
              {!isLogged && (
                <NoLoggedMobileMenuItems handleClose={handleCloseNavMenu} />
              )}

              {/* Usuario logueado */}
              {isLogged && (
                <MenuItem onClick={handleClose}>
                  <Link className="clear-link" to="">
                    Cerrar sesión
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* ---------- Header principal ---------- */}
          <Box flexGrow={1} display="flex" alignItems="center">
            <Box component={Link} to="/" display="flex">
              <Box
                component="img"
                src={Logo}
                alt="SountRentals"
                sx={{ maxWidth: { xs: "130px", md: "150px" } }}
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mx: 2, display: "block", fontWeight: "500" }}
              >
                <Link className="clear-link shiny-hover" to="/djs">
                  NUESTROS DJ'S
                </Link>
              </Button>

              {/* Usuario administrador */}
              {user.rol === import.meta.env.VITE_ADMIN_ROL && (
                <>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500", pr: 2 }}
                  >
                    <Link className="clear-link shiny-hover" to="/manage-users">
                      ADMIN. USUARIOS
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500", pr: 2 }}
                  >
                    <Link className="clear-link shiny-hover" to="/manage-djs">
                      ADMIN. DJ'S
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500" }}
                  >
                    <Link
                      className="clear-link shiny-hover"
                      to="/manage-characteristics"
                    >
                      ADMIN. CARACT.
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500" }}
                  >
                    <Link
                      className="clear-link shiny-hover"
                      to="/manage-categories"
                    >
                      ADMIN. ESTILOS.
                    </Link>
                  </Button>
                </>
              )}

              {/* Usuario común logueado */}
              {user.rol === import.meta.env.VITE_COMMON_ROL && (
                <>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500", pr: 3 }}
                  >
                    <Link
                      className="clear-link shiny-hover"
                      to="/djs-favoritos"
                    >
                      FAVORITOS
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500", pr: 3 }}
                  >
                    <Link className="clear-link shiny-hover" to="/reservations">
                      RESERVAS
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ display: "block", fontWeight: "500" }}
                  >
                    <Link className="clear-link shiny-hover" to="/user-info">
                      MIS DATOS
                    </Link>
                  </Button>

                </>
              )}
            </Box>
          </Box>

          {/* ---------- Botones de la derecha ---------- */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {isLogged && (
              <Box display="flex" alignItems="center">
                <Link
                  className="clear-link"
                  to={
                    user.rol === import.meta.env.VITE_ADMIN_ROL
                      ? "/manage-users"
                      : "/user-info"
                  }
                >
                  <Avatar name={user.email} />
                </Link>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ ml: 2 }}
                >
                  <Link className="clear-link light-text" to="">
                    CERRAR SESIÓN
                  </Link>
                </Button>
              </Box>
            )}
            {!isLogged && (
              <>
                <Button variant="contained" sx={{ mx: 2 }}>
                  <Link className="clear-link light-text" to="/signin">
                    INICIAR SESIÓN
                  </Link>
                </Button>
                <Button variant="contained" sx={{ mx: 2 }}>
                  <Link className="clear-link light-text" to="/register">
                    REGISTRARSE
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
