import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function ProductMaterialForm() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [materials, setMaterials] = useState([]);

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantity, setQuantity] = useState("");

  async function loadData() {
    const productRes = await api.get(`/products/${productId}`);
    setProduct({
      ...productRes.data,
      associations: []
    });

    const materialRes = await api.get("/materials");
    setMaterials(materialRes.data);

    const associationsRes = await api.get(`/products/${productId}/materials`)

    setProduct((prev) => ({ 
      ...prev, 
      associations: associationsRes.data
    }));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addMaterial() {
    if (!selectedMaterial || !quantity) return;

    const dto = {
      rawMaterialId: Number(selectedMaterial),
      quantityRequired: Number(quantity)
    }

    const res = await api.post(`/products/${productId}/materials`, dto)

    setProduct((prev) => ({
      ...prev,
      associations: [...prev.associations, res.data]
    }));

    setSelectedMaterial("");
    setQuantity("");
  }

  async function removeMaterial(assocId) {
    await api.delete(`/products/${productId}/materials/${assocId}`)

    setProduct((prev) => ({
      ...prev,
      associations: prev.associations.filter((assoc) => assoc.id !== assocId)
    }));
  }

  if (!product) return null;

  return (
    <Box>
      <Typography variant="h4" mb={3} sx={{ color: "#6a1b9a" }}>
        Manage Materials for: {product.name}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Add Material
        </Typography>

        <Box display="flex" gap={2}>
          <FormControl fullWidth>
            <InputLabel>Material</InputLabel>
            <Select
              value={selectedMaterial}
              label="Material"
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              {materials.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Required Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button variant="contained" onClick={addMaterial}>
            Add
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Materials Used
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Required Quantity</TableCell>
              <TableCell width={50}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {product.associations?.map((assoc) => (
              <TableRow key={assoc.id}>
                <TableCell>{assoc.rawMaterialName}</TableCell>
                <TableCell>{assoc.quantityRequired}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => removeMaterial(assoc.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {(!product.associations || product.associations.length === 0) && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#777" }}>
                  No materials linked.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/products")}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}
