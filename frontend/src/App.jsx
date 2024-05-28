import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import darkTheme from "./styles/themeConfig";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddService";
import NotFound from "./components/pages/NotFound";
import DJs from "./components/pages/DJs";
import Contact from "./components/pages/Contact";
import SignIn from "./components/pages/SignIn";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import AuthContextComponent from "./context/AuthContext";
import DjDetail from "./components/pages/DjDetail";

function App() {
  return (
    <AuthContextComponent>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/djs" element={<DJs />} />
              <Route path="/dj-detail/:id" element={<DjDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="signin" element={<SignIn />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPass" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextComponent>
  );
}

export default App;
