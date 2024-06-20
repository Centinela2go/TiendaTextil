import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ClienteForm from "./components/forms/ClienteForm";
import DataTable from "./components/tables/datatable";
import SideBar from "./components/sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ClienteForm /> Añade el formulario aquí */}
      {/* <DataTable /> */}
      <div className="">
      <Router >
        <SideBar>
          <Routes>
            <Route exact path="/" element={<div><DataTable /></div>} />
            <Route exact path="/creditos" element={<div>creditos</div>} />
            <Route exact path="/productos" element={<div>productos</div>} />
            <Route exact path="/clientes" element={<div>clientes</div>} />
            <Route exact path="/ventas" element={<div>venta</div>} />
            <Route
              path="*"
              element={
                <div>
                  <p>Error 404</p>
                </div>
              }
            />
          </Routes>
        </SideBar>
      </Router>
      </div>
    </>
  );
}

export default App;
