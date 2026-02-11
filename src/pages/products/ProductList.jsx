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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuProductId, setMenuProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setMenuProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuProductId(null);
  };

  const handleEdit = () => {
    navigate(`/products/${menuProductId}`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${menuProductId}`);
      loadProducts();
    } catch (error) {
      if (error.response?.status === 409) {
        alert(
          "This product cannot be deleted because it has associated raw materials.",
        );
      } else {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
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
          Products
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8e24aa",
            "&:hover": { backgroundColor: "#6a1b9a" },
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/products/new")}
        >
          New Product
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
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
                Price
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ "&:hover": { backgroundColor: "#faf5ff" } }}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleMenuClick(event, product.id)}
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
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => navigate(`/products/${menuProductId}/materials`)}
        >
          Manage Materials
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProductList;
