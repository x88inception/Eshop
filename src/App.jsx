import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProductsPage from "./ProductsPage";
import Admin from "./Admin";
import EditProduct from "./EditProduct";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={["ADMIN", "SUPER_ADMIN"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute requiredRole={["ADMIN", "SUPER_ADMIN"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
