import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  getCharacteristics,
  updateCharacteristic,
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
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [actualId, setActualId] = useState();
  const [actualCharacteristic, setActualCharacteristic] = useState();
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = (id, caracteristica) => {
    setActualId(id);
    setActualCharacteristic(caracteristica);
    setError(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleUpdateCharacteristics = async (caracteristica) => {
    const data = {
      id: actualId,
      caracteristica: caracteristica,
    };
    const resp = await updateCharacteristic(data);
    if (resp.status === 200) {
      const updatedCharacteristics = characteristics.map((char) => 
        char.id === actualId ? { ...char, caracteristica } : char
      );
      setCharacteristics(updatedCharacteristics);
      swal("Caracteristica actualizada!", {
        icon: "success",
      });
    } else {
      swal("Ocurrió un error, vuelva a intentarlo", {
        icon: "error",
      });
    }
  };

  const submitDialog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const caracteristica = formJson.caracteristica;
    if (caracteristica.length > 2 && caracteristica.length < 26) {
      handleUpdateCharacteristics(caracteristica);
      handleClose();
    } else {
      setError(true);
    }
  };

  const handleDeleteCharacteristics = (id) => {
    swal({
      title: "¿Seguro que quieres eliminar la característica?",
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
      <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ mb: 2 }}>
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
                          aria-label="update"
                          onClick={() => {
                            handleClickOpen(row.id, row.caracteristica);
                          }}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
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
      {/* Dialog de edición de caracteristica */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submitDialog,
        }}
      >
        <DialogTitle sx={{ mr: 15 }}>Editar característica</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="caracteristica"
            label="Característica"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={actualCharacteristic}
            error={error}
            helperText={error ? "Debe tener entre 3 y 25 caracteres" : ""}
          />
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageCharacteristics;
