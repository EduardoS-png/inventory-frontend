import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const RawMaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuMaterialId, setMenuMaterialId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const response = await api.get("/materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error loading raw materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, materialId) => {
    setAnchorEl(event.currentTarget);
    setMenuMaterialId(materialId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuMaterialId(null);
  };

  const handleEdit = () => {
    navigate(`/materials/edit/${menuMaterialId}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this raw material?"))
      return;

    try {
      await api.delete(`/materials/${menuMaterialId}`);
      loadMaterials();
    } catch (error) {
      console.error("Error deleting raw material:", error);
    } finally {
      handleMenuClose();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ color: "#6a1b9a", fontWeight: 600 }}>
          Raw Materials
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8e24aa",
            "&:hover": { backgroundColor: "#6a1b9a" },
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/materials/new")}
        >
          New Raw Material
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3e5f5" }}>
              <TableCell sx={{ color: "#4a148c", fontWeight: 600 }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#4a148c", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#4a148c", fontWeight: 600 }}>
                Stock Quantity
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {materials.map((material) => (
              <TableRow
                key={material.id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#faf5ff" },
                }}
              >
                <TableCell>{material.id}</TableCell>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.stockQuantity}</TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, material.id)}
                    sx={{ color: "#6a1b9a" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem sx={{ color: "red" }} onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RawMaterialList;
