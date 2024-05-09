import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Box component="main">
          <Outlet />
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
