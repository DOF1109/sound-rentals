import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
