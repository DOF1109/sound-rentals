import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>{user.rol === import.meta.env.VITE_ADMIN_ROL ? <Outlet /> : <Navigate to="/signin" />}</>
  );
};

export default ProtectedAdmin;