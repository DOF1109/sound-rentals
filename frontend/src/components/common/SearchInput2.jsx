import React, { useState } from 'react';
import { Autocomplete, Box, InputAdornment, Typography,TextField, Button,useTheme, IconButton, Popover } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateRange } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {getDjSearch} from '../../api/djsApi';
import { borderRadius } from '@mui/system';

const SearchInput = ({ ciudades }) => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [dateRange, setDateRange] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateWritten, setDateWritten] = useState(false);

  if (!ciudades || ciudades.length === 0) return null;

  const formattedCategories = ciudades.map((category) => ({
    label: category,
  }));

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue);
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
  console.log('date range:', dateRange);

  const handleDatePickerToggle = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSearch = async () => {
    try {
      const response = await getDjSearch(1, dateRange[0].startDate, dateRange[0].endDate);
      setSearchResults(response);
      console.log('response:', response);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      if (error.response) {
        console.error('Error de la API:', error.response.data.message);
      } else {
        console.error('Error general:', error.message);
      }
    }
  };
  const handleDateRangeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateRangeClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-popover' : undefined;

  return (
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
          sm: 700,
          md: 900,
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
        options={formattedCategories}
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
          marginLeft: {
            sm: '2rem',
            md: '3rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '1rem',
          }}
        >
          <Box
          onClick={handleDateRangeClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
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
          {dateWritten === true ? 
              <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.8rem',
                },
                fontWeight: 'bold',
                margin: '0',
              }}>
                {new Date(dateRange[0].startDate).toLocaleDateString()}
                -
                {new Date(dateRange[0].endDate).toLocaleDateString()}
              </Typography>  : 
              <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.8rem',
                },
                fontWeight: 'bold',
                margin: '0',
              }}
            >
              
              __/__/__ <HorizontalRuleIcon sx={{ fontSize: {
                xs: '1rem',
                sm: '1.2rem',
              } }} /> __/__/__
            </Typography>        
            }
          
          </Box>
 
          <Box
             sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.primary,
              cursor: 'pointer',
              marginLeft: '2rem',
              border: 'solid',
              borderRadius: '2rem',
              padding: '0.5rem 1rem',
              '&:hover': {
                color: theme.palette.secondary.dark,
              },
            }}
          >
            <Typography >
              Buscar
            </Typography>
            <SearchIcon 
              onClick={handleSearch}
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
  );
};

export default SearchInput;