import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { getUsers } from "../../api/userApi";

const columns = [
  { id: "id", label: "ID", minWidth: 150 },
  { id: "nombre", label: "Nombre", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "isAdmin", label: "Es administrador?", minWidth: 150 },
];

const ManageUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState();

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

  return (
    <Container sx={{ py: 5 }}>
      {users ? (
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
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.email}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {column.id !== "isAdmin"
                                ? value
                                : row.isAdmin
                                ? "Si"
                                : "No"}
                            </TableCell>
                          );
                        })}
                        <TableCell align="center">
                          <ChangeCircleIcon sx={{ opacity: 0.5 }} />
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
      ) : (
        <Typography variant="h5">Cargando...</Typography>
      )}
    </Container>
  );
};

export default ManageUsers;
