import { Outlet, Navigate } from "react-router-dom";

const ProtectedUsers = () => {
  const isLogged = JSON.parse(localStorage.getItem("isLogged"));

  return (
    <>{isLogged ? <Outlet /> : <Navigate to="/signin" />}</>
  )
};

export default ProtectedUsers;