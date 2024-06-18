import React, { useState } from 'react';
import { Autocomplete, Box, InputAdornment, TextField, Button,useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateRange } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

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
  };
  console.log('date range:', dateRange);

  const handleDatePickerToggle = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <Box
      className="shiny-dark"
      sx={{
        display:'flex',
        background: theme.palette.background.paper,
        borderRadius: "50px",
        border: 0,
        maxWidth: 650,
        mx: "auto",
        my: 4,
        p: 1,
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
              width: 350,
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
                color: '#07020D',
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
            // alignItems: 'center',
            // justifyContent: 'center',
            // height: '100%',
            // marginLeft: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.primary,
              cursor: 'pointer',
            }}
            onClick={handleDatePickerToggle}
          >
            <DateRangeIcon
              sx={{
                mr: '1rem',
              }}
            />
            <p
              style={{
                fontSize: '10px',
                fontWeight: 'bold',
                margin: '0',
              }}
            >
              __/__/__ <HorizontalRuleIcon sx={{ fontSize: '15px' }} /> __/__/__
            </p>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.primary,
              cursor: 'pointer',
              marginLeft: '3rem',
            }}
          >
            <SearchIcon />
          </Box>
        </Box>
      {showDatePicker && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 100,
            top:'20%',
            left: '60%',
            transform: 'translateX(-50%)',
          }}
        >
          <DateRange
            minDate={new Date()}
            onChange={handleDateRangeChange}
            ranges={dateRange}
            rangeColors={[theme.palette.background.paper]}
            style={{color:'black'}}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Button
              variant="contained"
              onClick={handleCancelDateRange}
              type="submit"
              sx={{
                color: 'white',
                textTransform: 'none',
                textShadow: '2px 2px 2px grey',
              }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              onClick={handleDateSelect}
              type="submit"
              sx={{
                color: 'white',
                textTransform: 'none',
                textShadow: '2px 2px 2px grey',
              }}
            >
              listo
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;