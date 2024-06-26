import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import WhatsAppButton from "../common/WhatsAppButton";

const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <WhatsAppButton
        phoneNumber="+5493873214641"
        message="Hola, tengo una consulta sobre un DJ."
      />
    </>
  );
};

export default Layout;
