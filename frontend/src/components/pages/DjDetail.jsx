import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import SpeakerIcon from '@mui/icons-material/Speaker';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AlbumIcon from '@mui/icons-material/Album';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import TuneIcon from '@mui/icons-material/Tune';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { Link, useParams } from "react-router-dom";
import ImageMasonry from "../common/ImageMasonry";
import { getDj } from "../../api/djsApi.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "1px solid var(--text-color)",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const getRandomIcon = () => {
  const icons = [
    <SpeakerIcon />,
    <LibraryMusicIcon />,
    <AudiotrackIcon />,
    <AlbumIcon />,
    <MusicVideoIcon />,
    <TuneIcon />,
    <EqualizerIcon />,
    <PlaylistAddCheckCircleIcon />
  ];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

const DjDetail = () => {
  const { id } = useParams();
  const [dj, setDj] = useState();
  const [djImages, setDjImages] = useState();
  const [open, setOpen] = useState(false);
  const { handleLogout, user, isLogged } = useContext(AuthContext);

  const isAdmin = user.rol === import.meta.env.VITE_ADMIN_ROL

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imagesDj = () => {
    const arrayImg = [];
    for (let i = 1; i <= 5; i++) {
      const imgKey = `urlImg${i}`;
      arrayImg.push(dj[imgKey]);
    }
    return arrayImg;
  };

  const loadDj = async () => {
    const data = await getDj(id);
    if (data) {
      setDj(data);
    }
  };

  useEffect(() => {
    if (dj) setDjImages(imagesDj());
  }, [dj]);

  useEffect(() => {
    loadDj();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      {dj ? (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Box
              component="img"
              src={dj.urlPic}
              alt="Foto de perfil del Dj"
              borderRadius={3}
              sx={{
                maxWidth: "250px",
                maxHeight: "250px",
              }}
            />
            <Box>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  p: 1,
                  minWidth: "300px",
                  maxWidth: "500px",
                }}
              >
                <CardContent>
                  <Typography variant="h5">{`${dj.name} ${dj.lastname}`}</Typography>
                  <hr />
                  <Typography py={3}>{`PRECIO: $ ${dj.charge}`}</Typography>
                  <Typography>CATEGORIA:</Typography>
                  {dj.estilos.map((estilo) => {
                    return (
                      <Typography
                        key={estilo.style}
                        variant="body2"
                        pl={1}
                      >{`* ${estilo.style}`}</Typography>
                    );
                  })}
                  <Typography variant="body2" pt={3} pb={1}>
                    Sobre el DJ
                  </Typography>
                  <Typography variant="body2" pl={1}>
                    {dj.comment}
                  </Typography>
                  <Typography variant="body1" pt={3} pb={1}>
                    Caracteristicas
                  </Typography>
                  {
                    dj && dj.caracteristicas.map((caracteristica,index)=>(
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getRandomIcon()}
                        </ListItemIcon>
                        <ListItemText primary={caracteristica.caracteristica} />
                      </ListItem>
                    ))
                  }
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Card
              variant="outlined"
              sx={{ borderRadius: 3, p: 2, minWidth: "200px" }}
            >
              <CardContent sx={{ pb: 0 }}>
                {djImages && <ImageMasonry images={djImages} />}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ width: "100%", mb: 1 }}
                  onClick={handleOpen}
                >
                  Ver todas
                </Button>
              </CardActions>
            </Card>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "100%", my: 2 }}
            >
              <Link className="clear-link light-text" to="/signin">
                RESERVAR
              </Link>
            </Button>
          </Grid>

          {/* ---------- Modal de galeria de imagenes ---------- */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mb={2}
              >
                {`${dj.name} ${dj.lastname}`}
              </Typography>
              <ImageMasonry images={djImages} />
            </Box>
          </Modal>
        </Grid>
      ) : (
        <Typography variant="h5">Cargando...</Typography>
      )}
    </Container>
  );
};

export default DjDetail;
