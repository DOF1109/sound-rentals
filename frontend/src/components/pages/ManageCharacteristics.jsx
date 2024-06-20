import { Button, Container, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  getCharacteristics,
  deleteCharacteristic,
} from "../../api/characteristicsApi";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "caracteristica", label: "Caracteristica", minWidth: 150 },
];

const ManageCharacteristics = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [characteristics, setCharacteristics] = useState();
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down("sm"));

  const loadCharacteristics = async () => {
    const data = await getCharacteristics();
    if (data) setCharacteristics(data);
  };

  useEffect(() => {
    loadCharacteristics();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteCharacteristics = (id) => {
    swal({
      title: "¿Seguro que quieres elimnar la característica?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const resp = await deleteCharacteristic(id);
        if (resp.status === 200) {
          swal("Caracteristica eliminada!", {
            icon: "success",
          });
          setCharacteristics(
            characteristics.filter((characteristic) => characteristic.id !== id)
          );
        } else {
          swal("Ocurrió un error, vuelva a intentarlo", {
            icon: "error",
          });
        }
      }
    });
  };

  if (isXsOrSm) {
    return (
      <Typography variant="h5" my={5} mx={2} textAlign="center">
        No disponible en móvil
      </Typography>
    );
  }

  if (!characteristics) return <Loader />;

  return (
    <Container sx={{ py: 5 }}>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
      >
        <Link className="clear-link light-text" to="/add-characteristic">
          AGREGAR CARACTERISTICA
        </Link>
      </Button>
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
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characteristics
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteCharacteristics(row.id);
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
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
          count={characteristics.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ManageCharacteristics;
