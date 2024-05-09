import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0007A7",
    },
    secondary: {
      main: "#4C4592",
    },
    background: {
      default: "#160526",
      paper: "#07020d",
    },
    text: {
      primary: "#F4C9FF",
    },
  },
  typography: {
    fontFamily: "Orbitron, sans-serif",
  },
});

export default darkTheme;
