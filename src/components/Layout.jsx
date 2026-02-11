import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Box
        sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", paddingTop: 4 }}
      >
        <Container
          maxWidth="lg"
          sx={{
            background: "#fff",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
