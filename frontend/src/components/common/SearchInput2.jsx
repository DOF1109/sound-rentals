import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, InputAdornment, Typography,TextField, IconButton, Popover,Button,useTheme,FormControl,
  InputLabel,
  Select,
  MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateRange } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {getDjSearch} from '../../api/djsApi';
import { borderRadius } from '@mui/system';
import { getCiudades } from "../../api/ciudadesApi";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const SearchInput = ({ setDjs, setPageDjs, itemsPerPage, setPage, categories }) => {
  const [ciudades, setCiudades] = useState();

  const loadCiudades = async () => {
    const data = await getCiudades();
    if (data) setCiudades(data);
  };

  useEffect(() => {
    loadCiudades();
    
  }, []);

  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [ciudadId, setCiudadId] = useState()
  // const [styleId, setStyleId] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [dateRange, setDateRange] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateWritten, setDateWritten] = useState(false);
  

   if (!ciudades || ciudades.length === 0) return null;

   const formattedCiudades = ciudades.map((ciudad) => ({
    label: ciudad.nombre,
    value: ciudad.id,
  }));


  const handleCategoryChange = ( event, newValue) => {
    setSelectedCategorie(newValue.props.children);
  }

  const getIndiceCategoriaSeleccionada = () => {
    if (selectedCategorie !== '') {
      const selectedCategorieIndex = categories.find((categorie) => categorie.style === selectedCategorie);
      return selectedCategorieIndex?.id || null;
    } else {
      return '';
    }
  };

  
  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue.label);
    setCiudadId(newValue.value)
  };

  const handleDateSelect = (ranges) => {
    setShowDatePicker(false);
  }

  const handleCancelDateRange = () => {
    setShowDatePicker(false);

  }

  const handleDateRangeChange = (item) => {
    setDateRange([item.selection]);
    setDateWritten(true)
  };

  const handleDatePickerToggle = () => {
    setShowDatePicker(!showDatePicker);
  };

// Búsqueda por ciudad
const handleSearchByCiudad = async () => {
  try {
    const response = await getDjSearch({ ciudadId });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por ciudad:', error);
    // Manejo del error
  }
};

// Búsqueda por categoría
const handleSearchByCategorie = async () => {
  try {
    const styleId = getIndiceCategoriaSeleccionada();
    const response = await getDjSearch({ styleId });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por categoría:', error);
    // Manejo del error
  }
};

// Búsqueda por fechas
const handleSearchByDateRange = async () => {
  try {
    const response = await getDjSearch({
      fechaInicio: dateRange[0].startDate.toISOString().slice(0, 10),
      fechaFin: dateRange[0].endDate.toISOString().slice(0, 10),
    });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por fechas:', error);
    // Manejo del error
  }
};
// Búsqueda por ciudad y categoría
const handleSearchByCiudadAndCategorie = async () => {
  try {
    const styleId = getIndiceCategoriaSeleccionada();
    const response = await getDjSearch({
      ciudadId,
      styleId,
    });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por ciudad y categoría:', error);
    // Manejo del error
  }
};

// Búsqueda por ciudad y fechas
const handleSearchByCiudadAndDateRange = async () => {
  try {
    
    const response = await getDjSearch({
      ciudadId,
      fechaInicio: dateRange[0].startDate.toISOString().slice(0, 10),
      fechaFin: dateRange[0].endDate.toISOString().slice(0, 10),
    });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por ciudad y fechas:', error);
    // Manejo del error
  }
};

// Búsqueda por categoría y fechas
const handleSearchByCategorieAndDateRange = async () => {
  try {
    const styleId = getIndiceCategoriaSeleccionada();

    const response = await getDjSearch({
      styleId,
      fechaInicio: dateRange[0].startDate.toISOString().slice(0, 10),
      fechaFin: dateRange[0].endDate.toISOString().slice(0, 10),
    });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por categoría y fechas:', error);
    // Manejo del error
  }
};

// Búsqueda por ciudad, categoría y fechas
const handleSearchByCiudadAndCategorieAndDateRange = async () => {
  try {
    const styleId = getIndiceCategoriaSeleccionada();

    const response = await getDjSearch({
      ciudadId,
      styleId,
      fechaInicio: dateRange[0].startDate.toISOString().slice(0, 10),
      fechaFin: dateRange[0].endDate.toISOString().slice(0, 10),
    });
    setDjs(response);
    setPageDjs(response.slice(0, itemsPerPage));
    setPage(1)
  } catch (error) {
    console.error('Error en la búsqueda por ciudad, categoría y fechas:', error);
    // Manejo del error
  }
};

const handleSearch = () => {
  if (selectedCity !== null && selectedCategorie !== null && dateRange[0]?.startDate && dateRange[0]?.endDate) {
    handleSearchByCiudadAndCategorieAndDateRange();
  } else if (selectedCity !== null && selectedCategorie !== null) {
    handleSearchByCiudadAndCategorie();
  } else if (selectedCity !== null && dateRange[0]?.startDate && dateRange[0]?.endDate) {
    handleSearchByCiudadAndDateRange();
  } else if (selectedCategorie !== null && dateRange[0]?.startDate && dateRange[0]?.endDate) {
    handleSearchByCategorieAndDateRange();
  } else if (selectedCity !== null) {
    handleSearchByCiudad();
  } else if (selectedCategorie !== null) {
    handleSearchByCategorie();
  } else if (dateRange[0]?.startDate && dateRange[0]?.endDate) {
    handleSearchByDateRange();
  } else {
    // Mostrar un mensaje de error o realizar alguna acción cuando no se ha seleccionado ningún filtro
    console.error('Debes seleccionar al menos un filtro para realizar la búsqueda.');
  }
};


  const handleDateRangeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateRangeClose = () => {
    setAnchorEl(null);
  };

  const handleResetearFiltros = () => {
    setSelectedCategorie(null)
    setSelectedCity(null)
    setDateRange([
      {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      },
    ]);
  setDateWritten(false)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'date-range-popover' : undefined;

  return (
    <>
    <Box
      className="shiny-dark"
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        background: theme.palette.background.paper,
        borderRadius: "50px",
        border: 0,
        maxWidth: {
          xs: '100%',
          sm: 1000,
          md: 1100,
        },
        mx: 'auto',
        my: {
          xs: 2,
          sm: 4,
          md: 6,
        },
        p: {
          xs: 1,
          sm: 1.5,
          md: 2,
        },
        position: 'relative',
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box"
        options={formattedCiudades}
        value={selectedCity}
        onChange={handleCityChange}
        noOptionsText="No se encontró"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Seleccione una ciudad.."
            variant="outlined"
            color="secondary"
            sx={{
              ml:'1rem',
              width: {
                xs: '100%',
                sm: 350,
                md: 400,
              },
              ".MuiOutlinedInput-root": {
                position: 'relative',
                "& fieldset": {
                  borderColor:  '#07020D',
                  borderWidth: 2,
                  borderRightWidth: 0,
                },
                "&:hover fieldset": {
                  borderColor: '#07020D',
                },
                "&.Mui-focused fieldset": {
                  borderColor: '#07020D',
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40px',
                  height: '100%',
                  backgroundColor: '#07020D',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 50%)',
                },
                background: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))', 
              },
              '& .MuiInputBase-input': {
                color: '#ffff',
              },
            }}
            InputLabelProps={{
              style: { color: theme.palette.text.primary, marginLeft: '10px' },
            }}
          />
        )}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: {
            xs: '1rem',
            sm: 0,
            md: 0,
          },
        }}
      >
   <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '1rem',
            [`@media (max-width: 767px)`]: {
              display: 'inline-block',
            },
          }}
        >
          <Box
          onClick={handleDateRangeClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr:'2rem',
            [`@media (max-width: 767px)`]: {
              display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
            },
          }}
          >
         <IconButton
            aria-describedby={id}
            
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                color: theme.palette.secondary.dark,
              },
            }}
          >
            <DateRangeIcon />
          </IconButton>
          {dateWritten === true ? (
              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.8rem',
                  },
                  fontWeight: 'bold',
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    margin: '0.25rem 0',
                  },
                }}
              >
                {new Date(dateRange[0].startDate).toLocaleDateString()}
                <Box display="flex" alignItems="center">
                  <HorizontalRuleIcon
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1.2rem',
                      },
                    }}
                  />
                </Box>
                {new Date(dateRange[0].endDate).toLocaleDateString()}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.8rem',
                  },
                  fontWeight: 'bold',
                  margin: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    margin: '0.25rem 0',
                  },
                }}
              >
                __/__/__ 
                <Box display="flex" alignItems="center">
                  <HorizontalRuleIcon
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1.2rem',
                      },
                    }}
                  />
                </Box>
                __/__/__
              </Typography>
            )}
          
          </Box>
          <FormControl
            sx={{
              width:'15vw',
              ml:'1rem',
              [`@media (max-width: 767px)`]: {
                width: '80vw',
                mt:'1rem',
              },
            }}
            variant="outlined" 
          >
            <InputLabel>Elige una categoría</InputLabel>
            <Select
              label="Categoría"
              onChange={handleCategoryChange}
              value={selectedCategorie}
            >
              <MenuItem value=''>
                Todos
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.style}>
                  {category.style}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
             sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:'3rem',
              color: theme.palette.text.primary,
              cursor: 'pointer',
              border: 'solid',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
              '&:hover': {
                color: theme.palette.secondary.dark,
              },
              [`@media (max-width: 767px)`]: {
                mt:'1rem',
                marginLeft:'1rem',
              },
            }}
            onClick={handleSearch}

          >
            <Typography >
              Buscar
            </Typography>
            <SearchIcon 
            />
          </Box>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleDateRangeClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <DateRange
          minDate={new Date()}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </Popover>
      </Box>
      
    </Box>
    <Button
    onClick={handleResetearFiltros}
    sx={{
      ml:'2rem',
      mt:'-4rem',
      [`@media (max-width: 767px)`]: {
        mt:'0.5rem',
        mb:'1rem',
        // color:'black'
      },
    }}
    >
    <RotateLeftIcon/>
    Resetear filtros
  </Button>
  </>
  );
};

export default SearchInput;