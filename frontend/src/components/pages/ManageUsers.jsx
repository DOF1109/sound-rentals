import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { getUsers } from "../../api/userApi";
import Loader from "../common/Loader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext";
import { getUserByEmailFirebase,changeUserRole, getAllUsers } from "../../firebaseConfig";

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "nombre", label: "Nombre", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "isAdmin", label: "Es administrador?", minWidth: 150 },
];

const ManageUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const {usersFb,loadUsersFb} = useContext(AuthContext);
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down("sm"));


  const loadUsers = async () => {
    const data = await getUsers();
    if (data) setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeRol = async (userData)=>{
    let user = await getUserByEmailFirebase(userData.email);
    let newRol = undefined
    if(user.rol== import.meta.env.VITE_ADMIN_ROL){
      newRol = import.meta.env.VITE_COMMON_ROL;
    }
    else{
      newRol = import.meta.env.VITE_ADMIN_ROL;
    }
    const res = await changeUserRole(user.uid,newRol);

    if(res){
      loadUsersFb();
    }
    else{
      alert("Hubo un problema al cambiar el rol")
    }
  }

  const getRolForUser = (user)=>{
    if(users.length>0 && usersFb.length>0 && user){
      let userFb = usersFb.find((u)=>u.email==user.email);
      if(userFb){
        return userFb.rol;
      }
    }
    return null;
  }

  if (isXsOrSm) {
    return (
      <Typography variant="h5" my={5} mx={2} textAlign="center">
        No disponible en móvil
      </Typography>
    );
  }

  if (!users) return <Loader />;

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ minWidth: 150 }}>
                  Cambiar rol
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isAdmin = getRolForUser(row) === import.meta.env.VITE_ADMIN_ROL ? "Si" : "No";
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                      {columns.map((column) => {
                        const value = column.id !== "isAdmin" ? row[column.id] : isAdmin;
                        return (
                          <TableCell key={column.id} align="center">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <ChangeCircleIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleChangeRol(row)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ManageUsers;
