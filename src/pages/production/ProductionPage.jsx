import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { api } from "../../api/api";

export default function ProductionPage() {
  const [production, setProduction] = useState([]);

  async function loadData() {
    const res = await api.get("/production");
    setProduction(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
        sx={{
          color: "#6a1b9a",
          fontWeight: "600",
        }}
      >
        Production Possibilities
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3e5f5" }}>
              <TableCell sx={{ color: "#6a1b9a", fontWeight: 600 }}>
                Product
              </TableCell>
              <TableCell sx={{ color: "#6a1b9a", fontWeight: 600 }}>
                Possible Quantity
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {production.map((p, index) => (
              <TableRow
                key={p.productId}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f0f0f0",
                  "&:hover": { backgroundColor: "#e0d7ff" },
                }}
              >
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.possibleQuantity}</TableCell>
              </TableRow>
            ))}

            {production.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    textAlign: "center",
                    padding: 4,
                    color: "#999",
                    fontStyle: "italic",
                  }}
                >
                  No production data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
