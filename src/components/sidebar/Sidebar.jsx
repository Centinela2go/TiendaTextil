import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  RectangleGroupIcon,
} from "@heroicons/react/16/solid";
import HomeIcomOutline from "../icons/HomeIcomOutline";
import StoreIconOutline from "../icons/StoreIconOutline";
import ClientIconOutline from "../icons/ClientIconOutline";
import VentaIconOutline from "../icons/VentaIconOutline";
import UserIconOutline from "../icons/UserIconOutline";
import { useAuth } from "../../security/Providers";

function GetNameSidebar(link) {
  switch (link) {
    case "/productos":
      return "Registro de productos";
    case "/clientes":
      return "Registro de clientes";
    case "/almacen/productos":
      return "Registro de productos en almacen";
    case "/producto/categoria":
      return "Registro de categorias de productos";
    case "/creditos":
      return "Registro de créditos";
    case "/dashboard":
      return "Dashboard";
    default:
      return "Dashboard";
  }
}

export default function SideBar({ children }) {
  const location = useLocation();
  const { getUser, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div className="flex h-screen w-full">
        <div
          className={`fixed inset-y-0 left-0 bg-white transition-all duration-300 text-lg 3xl:text-xl ${
            open ? "w-64 3xl:w-72" : "w-16 3xl:w-24"
          }`}
        >
          <div className="flex items-center justify-between h-16 3xl:h-24 px-4 bg-white">
            <button onClick={handleDrawerToggle} className="text-indigo-700">
              {open ? (
                <ChevronLeftIcon className="h-6 w-6 3xl:h-9 3xl:w-9" />
              ) : (
                <ChevronRightIcon className="h-6 w-6 3xl:h-9 3xl:w-9" />
              )}
            </button>
          </div>
          <nav className="flex flex-col">
            <Link
              to="/dashboard"
              title={open ? "" : "Dashboard"}
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <HomeIcomOutline
                  className={
                    "h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300"
                  }
                />
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
              to="/producto/categoria"
              title={open ? "" : "Categoria de Producto"}
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <RectangleGroupIcon className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Categoria Producto
              </span>
            </Link>
            <Link
              to="/almacen/productos"
              title={open ? "" : "Productos"}
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <StoreIconOutline className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Productos Almacen
              </span>
            </Link>
            <Link
              to="/clientes"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <ClientIconOutline className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Clientes
              </span>
            </Link>
            <Link
              to="/productos"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <VentaIconOutline className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Productos
              </span>
            </Link>
            <Link
              to="/ventas"
              className={`flex items-center py-4 text-indigo-700 hover:bg-indigo-400 hover:text-white ${
                open ? "px-4" : "justify-center"
              }`}
            >
              <div>
                <VentaIconOutline className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
              </div>
              <span
                className={`ml-4 transition-opacity delay-300 duration-300 ${
                  open ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                Registro de ventas
              </span>
            </Link>
          </nav>
        </div>
        {/* ${open ? "ml-64" : "ml-16"} */}
        <div
          className={`absolute left-0 top-0 flex flex-col transition-all duration-300 ${
            open
              ? "ml-64 3xl:ml-72 w-drawer-open 3xl:w-drawer-open-3xl"
              : "ml-16 3xl:ml-24 w-drawer 3xl:w-drawer-3xl"
          }`}
        >
          <div className="relative">
            <header className="sticky top-0 left-0 z-10 flex items-center justify-between h-16 3xl:h-24 px-4 bg-indigo-500 text-white w-full">
              <div className="flex items-center justify-between w-full">
                <h4 className="ml-4 text-sm 3xl:text-lg uppercase">
                  {GetNameSidebar(location.pathname)}
                </h4>

                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex h-7 3xl:h-9 items-center justify-center text-white"
                  >
                    <div className="mr-2 pb-2">Hola, {getUser().username}</div>
                    <UserIconOutline className="h-7 w-7 3xl:h-9 3xl:w-9 transition-transform duration-300" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                      <button
                        onClick={() => {
                          // Lógica para cerrar sesión
                          console.log("Cerrando sesión...");
                          logout();
                        }}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <main className="w-full p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
