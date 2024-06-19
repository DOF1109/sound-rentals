// src/components/layout/Footer.jsx
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/SoundRentals-logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        width: '100%', 
        py: 3, 
        backgroundColor: 'background.paper',
        color: 'white',
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <Box component={Link} to="/" display="flex" alignItems="center">
              <Box
                component="img"
                src={Logo}
                alt="SoundRentals"
                sx={{ maxWidth: { xs: "100px", md: "120px" }, mr: 2 }}
              />
            </Box>
            <Typography variant="body2" color="inherit">
              © {currentYear} SoundRentals. All rights reserved.
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Link to="/policies" className="clear-link" style={{ marginRight: 20, color: 'inherit' }}>
              <Typography variant="body2">
                Privacy Policy
              </Typography>
            </Link>
            <Typography variant="body2">
              Terms of Service
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Footer;
