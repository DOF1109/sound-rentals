import {
  Autocomplete,
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
    <Autocomplete
      disablePortal
      id="combo-box"
      options={formattedCategories}
      noOptionsText="No se encontró"
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "50px",
        border: 0,
        width: "100%",
        maxWidth: 500,
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione una ciudad.."
          variant="outlined"
          color="secondary"
          InputLabelProps={{
            style: { color: theme.palette.text.primary, marginLeft: "10px" }, // Label text color
          }}
        />
      )}
    />
  );
};

export default SearchInput;