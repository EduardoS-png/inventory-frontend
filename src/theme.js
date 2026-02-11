import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
  },
});
