import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import theme from "../../styles/themeConfig";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "isAdmin", label: "Es administrador?", minWidth: 170 },
  //   { id: "changeRol", label: "Cambiar rol", minWidth: 170 },
];

const rows = [
  { name: "Usuario 1", email: "usuario1@example.com", isAdmin: true },
  { name: "Usuario 2", email: "usuario2@example.com", isAdmin: false },
  { name: "Usuario 3", email: "usuario3@example.com", isAdmin: true },
  { name: "Usuario 4", email: "usuario4@example.com", isAdmin: false },
  { name: "Usuario 5", email: "usuario5@example.com", isAdmin: true },
  { name: "Usuario 6", email: "usuario6@example.com", isAdmin: false },
  { name: "Usuario 7", email: "usuario7@example.com", isAdmin: true },
  { name: "Usuario 8", email: "usuario8@example.com", isAdmin: false },
  { name: "Usuario 9", email: "usuario9@example.com", isAdmin: true },
  { name: "Usuario 10", email: "usuario10@example.com", isAdmin: false },
  { name: "Usuario 11", email: "usuario11@example.com", isAdmin: true },
  { name: "Usuario 12", email: "usuario12@example.com", isAdmin: false },
  { name: "Usuario 13", email: "usuario13@example.com", isAdmin: true },
  { name: "Usuario 14", email: "usuario14@example.com", isAdmin: false },
  { name: "Usuario 15", email: "usuario15@example.com", isAdmin: true },
];

const ManageUsers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                <TableCell align="center" style={{ minWidth: 170 }}>
                  Cambiar rol
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
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
                        <ChangeCircleIcon />
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
          count={rows.length}
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
