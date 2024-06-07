import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthContext);

  return (
    <>{user.rol === import.meta.env.VITE_ADMIN_ROL ? <Outlet /> : <Navigate to="/signin" />}</>
  );
};

export default ProtectedAdmin;