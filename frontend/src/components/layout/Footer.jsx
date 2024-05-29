import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/SoundRentals-logo.webp";
import { Button } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, py: 3 }}>
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
            {/* <Link to="/privacy-policy" className="clear-link" style={{ marginRight: 20, color: 'inherit' }}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="clear-link" style={{ color: 'inherit' }}>
              Terms of Service
            </Link> */}
            <Typography variant="body2" mr={2}>
              Privacy Policy
            </Typography>
            <Typography variant="body2">
              Terms of Service
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
