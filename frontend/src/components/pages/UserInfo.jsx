import { useEffect, useState } from "react";
import { Card, CardContent, Avatar, Typography } from "@mui/material";
import { getUserByEmail } from "../../api/userApi";
import Loader from "../common/Loader";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [userData, setUserData] = useState(null);

  const loadUserData = async () => {
    const data = await getUserByEmail(user.email);
    if (data) {
      setUserData(data);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (!userData) return <Loader />;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        maxWidth: 400,
        margin: "auto",
        mt: 4,
      }}
    >
      <Avatar name={user.email} />
      <CardContent sx={{ ml: 2 }}>
        <Typography variant="h6">{`${userData.nombre}`}</Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {user.email}
        </Typography>
        {/* <Typography variant="body2" color="textSecondary">
                    DNI: {userData.dni}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Celular: {userData.celular}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Dirección: {userData.direccion}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    País: {userData.pais?.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Provincia: {userData.provincia?.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Ciudad: {userData.ciudad?.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Estado: {userData.estadoUsuario?.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Rol: {userData.rol?.nombre}
                </Typography> */}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
