import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";

import Layout from "./components/Layout";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import ProductMaterialForm from "./pages/products/ProductMaterialForm";
import RawMaterialList from "./pages/rawMaterials/RawMaterialList";
import RawMaterialForm from "./pages/rawMaterials/RawMaterialForm";
import ProductionPage from "./pages/production/ProductionPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />

            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route
              path="products/:id/materials"
              element={<ProductMaterialForm />}
            />

            <Route path="materials" element={<RawMaterialList />} />
            <Route path="materials/new" element={<RawMaterialForm />} />
            <Route path="materials/:id" element={<RawMaterialForm />} />

            <Route path="production" element={<ProductionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
