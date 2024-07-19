import "./App.css";

import SideBar from "./components/sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ClientePage from "./pages/ClientePage";
import LoginForm from "./security/LoginForm";
import PrivateRoute from "./security/route/PrivateRoute";
import AuthProvider from "./security/Providers";
import CategoriaProductoPage from "./pages/CategoriaProductoPage";
import ProveedorPage from "./pages/ProveedorPage";
import ProductoAlmacenPage from "./pages/ProductoAlmacenPage";
import CustomCombobox from "./components/combobox/CustomCombobox";
import ProductoPage from "./pages/ProductoPage";
import VentaPage from "./pages/VentaPage";

function App() {
  return (
    <>
      <div className="bg-gray-200">
        <Router>
  
          <AuthProvider>
            
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[684px]">
                      <LoginForm />
                    </div>
                  </div>
                }
              />

              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/dashboard"
                  element={
                    <SideBar>
                      <ProveedorPage />
                    </SideBar>
                  }
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/producto/categoria"
                  element={
                    <SideBar>
                      <CategoriaProductoPage />
                    </SideBar>
                  }
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/almacen/productos"
                  element={
                    <SideBar>
                      <ProductoAlmacenPage />
                    </SideBar>
                  }
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/clientes"
                  element={
                    <SideBar>
                      <ClientePage />
                    </SideBar>
                  }
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/productos"
                  element={
                    <SideBar>
                      <ProductoPage />
                    </SideBar>
                  }
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  exact
                  path="/ventas"
                  element={
                    <SideBar>
                      <VentaPage />
                    </SideBar>
                  }
                />
              </Route>

              <Route
                path="*"
                element={
                  <Navigate to={"/login"}/>
                }
                
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
