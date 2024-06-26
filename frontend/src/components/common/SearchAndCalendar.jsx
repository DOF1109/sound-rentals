import { useState } from 'react'
import { DateRange } from 'react-date-range';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchInput from "../common/SearchInput2";

function SearchAndCalendar({setDjs, setPageDjs, itemsPerPage}) {
  const [selectedCity, setSelectedCity] = useState(null);

  //estados del calendario
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

  //manejo de los estados del calendario
  const handleDateSelect = (ranges) => {
    setStartDate (ranges.selection.startDate);
    setEndDate (ranges.selection.endDate);
  }

  //botón reset
  const resetInput = () => {
    setSearchItem('')
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };


  return (
    <>
    <SearchInput 
    itemsPerPage={itemsPerPage}
    onCitySelect={handleCitySelect} 
    setDjs={setDjs}
    setPageDjs={setPageDjs}
    // ciudadesId={ciudades.map((ciudad) => ciudad.ciudad)}
    />
  {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', marginBottom: '2rem' }}>
    <Button
      variant="contained"
      onClick={resetInput}
      type="submit"
      sx={{
        color: 'white',
        textTransform: 'none',
        textShadow: '2px 2px 2px grey',
      }}
    >
      Cancelar
    </Button>
    <Button
      variant="contained"
      type="submit"
      sx={{
        color: 'white',
        textTransform: 'none',
        textShadow: '2px 2px 2px grey',
      }}
    >
      Buscar
    </Button>
  </div> */}
    </>
  )
}

export default SearchAndCalendar