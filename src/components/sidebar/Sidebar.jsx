import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";

function GetNameSidebar(link) {
  switch (link) {
    case "/ventas":
      return "Registro de Orden de Venta";
    case "/clientes":
      return "Registro de clientes";
    case "/productos":
      return "Registro de productos";
    case "/creditos":
      return "Registro de créditos";
    case "/":
      return "Listado de orden de venta";
    default:
      return "Aplicación";
  }
}

export default function SideBar({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div className="flex h-screen w-full">
        <div
          className={`fixed inset-y-0 left-0 bg-gray-800 transition-all duration-300 ${
            open ? "w-64" : "w-16"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
            <button onClick={handleDrawerToggle} className="text-white">
              {open ? (
                <ChevronLeftIcon className="h-6 w-6" />
              ) : (
                <ChevronRightIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          <nav className="mt-10">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              <HomeIcon className="h-6 w-6 transition-transform duration-300" />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Ver orden de venta
              </span>
            </Link>
            <Link
              to="/creditos"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-6 w-6 transition-transform duration-300" />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Dashboard
              </span>
            </Link>
            <Link
              to="/productos"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-6 w-6 transition-transform duration-300" />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Registro Productos
              </span>
            </Link>
            <Link
              to="/clientes"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-6 w-6 transition-transform duration-300" />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Registro Clientes
              </span>
            </Link>
            <Link
              to="/ventas"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-700"
            >
              <ChevronLeftIcon className="h-6 w-6 transition-transform duration-300" />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Registro de orden
              </span>
            </Link>
          </nav>
        </div>
        {/* ${open ? "ml-64" : "ml-16"} */}
        <div
          className={`absolute left-0 top-0 flex flex-col transition-all duration-300 ${
            open ? "ml-64" : "ml-16"
          }`}

          style={{width: open? `calc(100% - 256px)`: `calc(100% - 64px)`}}
        >
          <div className="relative">
          <header className="sticky top-0 left-0 z-10 flex items-center justify-between h-16 px-4 bg-gray-800 text-white w-full">
            <div className="flex items-center">
              <h1 className="ml-4 text-lg">
                {GetNameSidebar(location.pathname)}
              </h1>
            </div>
          </header>
          <main className="w-full p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
