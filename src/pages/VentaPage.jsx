import React, { useState } from "react";
import { useAuth } from "../security/Providers";
import VentaForm from "../components/forms/VentaForm";

export default function VentaPage() {
  const urlClienteApi = "https://orlando.pythonanywhere.com/api/producto/";
  const titleButtonOpenFormAdd = "Agregar Producto";
  const [data, setData] = useState([]);
  const { token, logout } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [messageAlert, setMessageAlert] = useState(null);
  const [changeFetch, setChangeFetch] = useState(false);


  const toggleChangeFetch = () => setChangeFetch(!changeFetch);
  return (
    <div>
      <VentaForm
        title="Regitrar Venta"
        closeModal={() => setIsOpenModal(false)}
        fetchPostData={(value) => apiCall("post", urlClienteApi, value)}
      />
    </div>
  );
}
