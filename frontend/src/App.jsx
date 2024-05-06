import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddProduct";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
