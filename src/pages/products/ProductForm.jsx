import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => alert("Failed to load product"));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await api.put(`/products/${id}`, {
          name: form.name,
          price: Number(form.price),
        });
        alert("Product updated!");
      } else {
        await api.post("/products", {
          name: form.name,
          price: Number(form.price),
        });
        alert("Product created!");
      }

      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 550,
        margin: "0 auto",
        padding: 4,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        mb={2}
        sx={{ fontWeight: 600, color: "#6a1b9a" }}
      >
        {id ? "Edit Product" : "Create Product"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#9c27b0" },
                "&:hover fieldset": { borderColor: "#ce58ff" },
              },
            }}
          />

          <TextField
            label="Price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#9c27b0" },
                "&:hover fieldset": { borderColor: "#ce58ff" },
              },
            }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => navigate("/products")}
              sx={{
                color: "#6a1b9a",
                borderColor: "#6a1b9a",
                "&:hover": {
                  borderColor: "#9c27b0",
                  backgroundColor: "#f3e5f5",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#7b1fa2",
                "&:hover": { backgroundColor: "#9c27b0" },
              }}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
