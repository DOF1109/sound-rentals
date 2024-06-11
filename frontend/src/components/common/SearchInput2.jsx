import {
    Autocomplete,
    Box,
    InputAdornment,
    TextField,
    useTheme,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  
  const SearchInput = ({ ciudades }) => {
    const theme = useTheme();
  
    if (!ciudades || ciudades.length === 0) return null;
  
    const formattedCategories = ciudades.map((category) => ({
      label: category,
    }));
  
    return (
      <Box
        className="shiny-dark"
        sx={{
          background: theme.palette.background.paper,
          borderRadius: "50px",
          border: 0,
          maxWidth: 600,
          mx: "auto",
          my: 4,
          p: 1,
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box"
          options={formattedCategories}
          noOptionsText="No se encontró"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione una ciudad.."
              variant="outlined"
              color="secondary"
              sx={{
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.text.primary,
                    borderRadius: 50,
                    borderWidth: 2,
                  },
                },
                "& .MuiInputBase-input": {
                  color: theme.palette.text.primary, // Placeholder text color
                },
              }}
              InputProps={{
                ...params.InputProps
              }}
              InputLabelProps={{
                style: { color: theme.palette.text.primary, marginLeft: "10px" }, // Label text color
              }}
            />
          )}
        />
      </Box>
    );
  };
  
  export default SearchInput;