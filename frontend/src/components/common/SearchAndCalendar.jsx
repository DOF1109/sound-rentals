import { useState } from 'react'
import { DateRange } from 'react-date-range';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchInput from "../common/SearchInput2";

function SearchAndCalendar({djs, setDjs, setPage, setPageDjs, itemsPerPage, onSearch, categories}) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  //manejo de los estados del calendario
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredDjs = category
      ? djs.filter(dj => dj.estilos.some(estilo => estilo.style === category))
      : djs;
    setPageDjs(filteredDjs.slice(0, itemsPerPage));
    setPage(1);
  };

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
    djs={djs}
    setDjs={setDjs}
    setPageDjs={setPageDjs}
    setPage={setPage}
    selectedCategory={selectedCategory}
    onSearch={onSearch}
    categories={categories}
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