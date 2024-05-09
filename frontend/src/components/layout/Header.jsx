import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/SoundRentals-logo.webp";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ py: 3 }}>
      <Container>
        <Toolbar disableGutters>
          {/* Mobile menu */}
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
                <Link to="/djs">Nuestros DJs</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/contact">Contactanos</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/signin">Iniciar sesión</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/signup">Registrarse</Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box flexGrow={1} display="flex" alignItems="center">
            <Box component={Link} to="/" display="flex">
              <Box
                component="img"
                src={Logo}
                alt="SountRentals"
                sx={{ maxWidth: { xs: "130px", md: "160px" } }}
              />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mx: 2, display: "block" }}
              >
                <Link className="clear-link" to="/djs">
                  NUESTROS DJ'S
                </Link>
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ display: "block" }}>
                <Link className="clear-link" to="/contact">
                  CONTÁCTANOS
                </Link>
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Button variant="contained" sx={{ mx: 2 }}>
              <Link className="clear-link" to="/signin">
                INICIAR SESIÓN
              </Link>
            </Button>
            <Button variant="contained">
              <Link className="clear-link" to="/signup">
                REGISTRARSE
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
