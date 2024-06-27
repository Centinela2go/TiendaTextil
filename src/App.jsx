import "./App.css";

import SideBar from "./components/sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientePage from "./pages/ClientePage";
import LoginForm from "./security/LoginForm";
import PrivateRoute from "./security/route/PrivateRoute";
import AuthProvider from "./security/Providers";
import CategoriaProductoPage from "./pages/CategoriaProductoPage";
import ProveedorPage from "./pages/ProveedorPage";
import ProductoAlmacenPage from "./pages/ProductoAlmacenPage";
import CustomCombobox from "./components/combobox/CustomCombobox";

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
                  path="/productos"
                  element={
                    <SideBar>
                      <ProductoAlmacenPage />
                      <CustomCombobox apiUrl="http://127.0.0.1:8000/api/producto/categoria/" displayProperty="nombre" />
                      <CustomCombobox apiUrl="http://127.0.0.1:8000/api/producto/categoria/" displayProperty="nombre" />
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
                  path="/ventas"
                  element={
                    <SideBar>
                      hola
                    </SideBar>
                  }
                />
              </Route>

              <Route
                path="*"
                element={
                  <div>
                    <p>Error 404</p>
                  </div>
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
