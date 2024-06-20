
import "./App.css";

import SideBar from "./components/sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriaProductoPage from "./pages/CategoriaProductoPage";
import LoginForm from "./security/LoginForm";
import PrivateRoute from "./security/route/PrivateRoute";
function App() {
  return (
    <>
      <div className="bg-gray-200">
        <Router>
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
            <Route
              exact
              path="/"
              element={
                <SideBar>
                  <CategoriaProductoPage />
                </SideBar>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route
                exact
                path="/creditos"
                element={
                  <SideBar>
                    <CategoriaProductoPage />
                  </SideBar>
                }
              />
            </Route>
            <Route
              exact
              path="/productos"
              element={
                <SideBar>
                  <CategoriaProductoPage />
                </SideBar>
              }
            />
            <Route
              exact
              path="/clientes"
              element={
                <SideBar>
                  <CategoriaProductoPage />
                </SideBar>
              }
            />
            <Route
              exact
              path="/ventas"
              element={
                <SideBar>
                  <CategoriaProductoPage />
                </SideBar>
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <p>Error 404</p>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
