import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "13px",
          },
        }}
      />{" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
