import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import darkTheme from "./styles/themeConfig";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddService";
import NotFound from "./components/pages/NotFound";
import DJs from "./components/pages/DJs";
import SignIn from "./components/pages/SignIn";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import AuthContextComponent from "./context/AuthContext";
import DjDetail from "./components/pages/DjDetail";
import ManageUsers from "./components/pages/ManageUsers";
import UserInfo from "./components/pages/UserInfo";
import ProtectedAdmin from "./protectedRoutes/ProtectedAdmin";
import ProtectedUsers from "./protectedRoutes/ProtectedUsers";
import ManageDjs from "./components/pages/ManageDjs";
import DJFavoritos from "./components/pages/DJFavoritos";

function App() {
  return (
    <AuthContextComponent>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* RUTAS PARA USUARIOS SIN LOGEARSE */}
            <Route path="signin" element={<SignIn />} />
            <Route path="register" element={<Register />} />
            <Route path="forgotPass" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/djs" element={<DJs />} />
              <Route path="/dj-detail/:id" element={<DjDetail />} />
              <Route path="/djs-favoritos" element={<DJFavoritos />} />

              {/* RUTAS PARA USUARIO ADMIN */}
              <Route element={<ProtectedAdmin />}>
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/manage-djs" element={<ManageDjs />} />
              </Route>

              {/* RUTAS PARA USUARIOS COMUNES LOGEADOS */}
              <Route element={<ProtectedUsers />}>
                <Route path="/user-info" element={<UserInfo />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextComponent>
  );
}

export default App;
