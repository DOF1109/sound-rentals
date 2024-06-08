import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Card, CardContent, Avatar, Typography } from "@mui/material";
import { getUserByEmail } from "../../api/userApi";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
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

  if (!userData) {
    return <Typography>Error al cargar los datos del usuario</Typography>;
  }

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
        <Typography variant="h6">{`${userData.nombre} ${userData.apellido}`}</Typography>
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
