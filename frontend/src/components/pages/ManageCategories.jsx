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
  getCategories,
  deleteCategory,
} from "../../api/categoriesApi";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "style", label: "Estilo", minWidth: 150 },
];

const ManageCategories = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState();
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down("sm"));

  const loadCategories = async () => {
    const data = await getCategories();
    if (data) setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteCategories = (id) => {
    swal({
      title: "¿Seguro que quieres eliminar el estilo?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const resp = await deleteCategory(id);
        if (resp.status === 200) {
          swal("Estilo eliminado!", {
            icon: "success",
          });
          setCategories(
            categories.filter((category) => category.id !== id)
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

  if (!categories) return <Loader />;

  return (
    <Container sx={{ py: 5 }}>
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 2 }}
      >
        <Link className="clear-link light-text" to="/add-category">
          AGREGAR ESTILO
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
              {categories
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
                            handleDeleteCategories(row.id);
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default ManageCategories;
