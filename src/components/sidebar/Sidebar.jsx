import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon
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
          className={`fixed inset-y-0 left-0 bg-white transition-all duration-300 ${
            open ? "w-72" : "w-24"
          }`}
        >
          <div className="flex items-center justify-between h-24 px-4 bg-white">
            <button onClick={handleDrawerToggle} className="text-indigo-700">
              {open ? (
                <ChevronLeftIcon className="h-9 w-9" />
              ) : (
                <ChevronRightIcon className="h-9 w-9" />
              )}
            </button>
          </div>
          <nav className="flex flex-col">
            <Link
              to="/"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${ open ? "px-4": "justify-center" }`}
            >
              <div>
                <HomeIcon className="h-9 w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Ver orden de venta
              </span>
            </Link>
            <Link
              to="/creditos"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${ open ? "px-4": "justify-center" }`}
            >
              <div>
                <HomeIcon className="h-9 w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Dashboard
              </span>
            </Link>
            <Link
              to="/productos"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${ open ? "px-4": "justify-center" }`}
            >
              <div>
                <HomeIcon className="h-9 w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Registro Productos
              </span>
            </Link>
            <Link
              to="/clientes"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${ open ? "px-4": "justify-center" }`}
            >
              <div>
                <HomeIcon className="h-9 w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Registro Clientes
              </span>
            </Link>
            <Link
              to="/ventas"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${ open ? "px-4": "justify-center" }`}
            >
              <div>
                <HomeIcon className="h-9 w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
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
            open ? "ml-72" : "ml-24"
          }`}
          style={{ width: open ? `calc(100% - 288px)` : `calc(100% - 96px)` }}
        >
          <div className="relative">
            <header className="sticky top-0 left-0 z-10 flex items-center justify-between h-24 px-4 bg-indigo-500 text-white w-full">
              <div className="flex items-center">
                <h1 className="ml-4 text-lg uppercase">
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
