import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ color: "#6c1196", fontWeight: "bold", fontSize: "1.4rem" }}
        >
          Inventory Manager
        </Typography>

        <Box>
          <Button component={Link} to="/products" sx={navButtonStyle}>
            Products
          </Button>

          <Button component={Link} to="/materials" sx={navButtonStyle}>
            Raw Materials
          </Button>

          <Button component={Link} to="/production" sx={navButtonStyle}>
            Production
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const navButtonStyle = {
  color: "#395786",
  marginLeft: 2,
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "rgba(79,70,229,0.08)",
    color: "#5311cf",
  },
};
