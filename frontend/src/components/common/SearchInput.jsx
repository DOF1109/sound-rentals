import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const musicTypes = [{ label: "Rock" }, { label: "Pop" }, { label: "Jazz" }];

const SearchInput = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "50px",
        border: 0,
        maxWidth: 600,
        mx: "auto",
        my: 3,
        p: 1,
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box"
        options={musicTypes}
        noOptionsText="No se encontró"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo de música..."
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
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    style={{
                      color: theme.palette.text.primary,
                    }}
                  />
                </InputAdornment>
              ),
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
