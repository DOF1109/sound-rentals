import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/SoundRentals-logo.webp";
import { logOut } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../common/Avatar";

const Header = () => {
  const { handleLogout, user, isLogged } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClouse = () => {
    handleLogout();
    logOut();
    navigate("/signin");
  };

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
                <Link className="clear-link" to="/djs">
                  Nuestros DJs
                </Link>
              </MenuItem>

              {user.rol === import.meta.env.VITE_ADMIN_ROL && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="clear-link" to="/add-product">
                    Registrar DJ
                  </Link>
                </MenuItem>
              )}

              {!isLogged && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="clear-link" to="/signin">
                    Iniciar sesión
                  </Link>
                </MenuItem>
              )}

              {!isLogged && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link className="clear-link" to="/register">
                    Registrarse
                  </Link>
                </MenuItem>
              )}

              {isLogged && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleClouse();
                  }}
                >
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
              {user.rol === import.meta.env.VITE_ADMIN_ROL && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ display: "block", fontWeight: "500" }}
                >
                  <Link className="clear-link shiny-hover" to="/add-product">
                    REGISTRAR DJ
                  </Link>
                </Button>
              )}
            </Box>
          </Box>

          {/* ---------- Botones de la derecha ---------- */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, alignItems: 'center' }}>
            {isLogged && (
              <Box display="flex" alignItems="center">
                <Link to="/user-info">
                  <Avatar name={user.email} />
                </Link>
                <Button variant="contained" onClick={handleClouse} sx={{ ml: 2 }}>
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
