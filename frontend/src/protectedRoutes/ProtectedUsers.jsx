import { Outlet, Navigate } from "react-router-dom";

const ProtectedUsers = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>{ user && user.rol === import.meta.env.VITE_COMMON_ROL ? <Outlet /> : <Navigate to="/signin" />}</>
  )
};

export default ProtectedUsers;