import { Button, Container, IconButton, Rating } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AuthContext } from "../../context/AuthContext.jsx";
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
import { getReservasByUser } from "../../api/reservaApi";
import { addCalificacion } from "../../api/djsApi.js";

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "dj", label: "Dj", minWidth: 150 },
  { id: "startDate", label: "Fecha Inicio", minWidth: 150 },
  { id: "endDate", label: "Fecha Fin", minWidth: 150 },
];

const Reservations = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reservations, setReservations] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const { handleLogout, user, isLogged, userDb, reservasCalificadas,djFavorites, loadReservasCalificadas,loadDjsFavorites  } = useContext(AuthContext);
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down("sm"));

  const loadReservations = async () => {
    if(!userDb) return;

    const data = await getReservasByUser(userDb.id);
    console.log(data)
    if (data) setReservations(data);
  };

  const getCalification = (idReserva)=>{
    let calificacion = reservasCalificadas.find((r)=>r.reserva.id==idReserva);

    if(calificacion){
      return calificacion.calificacion;
    }
    else{
      return 0;
    }
  }

  const parseDate = (dateString)=>{
    let fecha = new Date();
    fecha.setFullYear(dateString.split('-')[0])
    fecha.setMonth(dateString.split('-')[1]-1)
    fecha.setDate(dateString.split('-')[2])

    return fecha;
  }

  useEffect(() => {
    loadReservations();
  }, [userDb]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCalificar = async (value,reserva) => {
    let calificacion = value

    setRatingValue(calificacion);

    const data = {
      reserva:reserva.id,
      calificacion,
      usuario:userDb.id
    }

    const response = await addCalificacion(data);
    if(response){
      loadReservasCalificadas();
    }
    else{
      alert("Ha ocurrido un error")
    }
  };

  if (!reservations) return <Loader />;

  return (
    <Container sx={{ py: 5 }}>
      {reservations.length>0 && <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                  Calificar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value = column.id=='dj'? `${row[column.id].name} ${row[column.id].lastname}` :row[column.id];
                        return (
                          <TableCell key={column.id} align="center">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                      <Rating
                        name="simple-controlled"
                        size="large"
                        value={getCalification(row.id)}
                        readOnly={getCalification(row.id)>0 || new Date() <= parseDate(row.endDate)}
                        onChange={(e, newValue) => handleCalificar(newValue, row)}
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
          count={reservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>}
      {reservations.length==0 &&
        <Box sx={{marginTop:'2rem'}}>
          <Alert variant="filled" severity="info" sx={{color:'white'}}>No has realizado reservas.</Alert>
        </Box>
      }
    </Container>
  );
};

export default Reservations;
