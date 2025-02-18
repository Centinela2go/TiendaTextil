import { createColumnHelper } from "@tanstack/react-table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";
import DeleteForm from "../components/form-delete/DeleteForm";
import axios from "axios";
import { useAuth } from "../security/Providers";
import Alert from "../components/alert/Alert";
import Snackbar from "../components/snackbar/Snackbar";
import Switch from "../components/switch/Switch";
import CategoriaForm from "../components/forms/CategoriaForm";
import CustomDatatable from "../components/tables/CustomDatatable";

const columnHelper = createColumnHelper();

export default function CategoriaProductoPage() {
  const urlClienteApi = "https://orlando.pythonanywhere.com/api/producto/categoria/";
  const titleButtonOpenFormAdd = "Agregar Categoria";
  const [data, setData] = useState([]);
  const { token, logout } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [messageAlert, setMessageAlert] = useState(null);
  const [changeFetch, setChangeFetch] = useState(false);

  const toggleChangeFetch = () => setChangeFetch(!changeFetch);

  const deleteForm = (row, closeModalDelete) => (
    <DeleteForm
      row={row}
      header="Eliminar Categoria"
      body={`Estas seguro de eliminar la categoria con nombre: `}
      keyHeader={row.original.nombre}
      closeModal={closeModalDelete}
      fetchDelete={() =>
        apiCall("delete", `${urlClienteApi}${row.original.id}/`)
      }
    />
  );
  const editForm = (row, closeModalEdit) => (
    <CategoriaForm
      title="Editar Categoria de Producto"
      defaultData={row.original}
      closeModal={closeModalEdit}
      isEdit={true}
      fetchPostData={(value) =>
        apiCall("put", `${urlClienteApi}${row.original.id}/`, value)
      }
    />
  );

  const addForm = () => (
    <CategoriaForm
      title="Agregar Categoria de Producto"
      closeModal={() => setIsOpenModal(false)}
      fetchPostData={(value) => apiCall("post", urlClienteApi, value)}
    />
  );

  const handleOpenSnackbar = (severity, message) => {
    setSeverity(severity);
    setMessageAlert(message);
    setIsOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setIsOpenSnackbar(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(urlClienteApi, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.rows);
      toggleChangeFetch();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        logout();
      } else if (error.response.status === 400) {
        if (error.response.data.hasOwnProperty('error')){
          const errors = error.response.data.error;
          const firstErrorKey = Object.keys(errors)[0];
          const firstErrorMessage = errors[firstErrorKey][0];
          handleOpenSnackbar(
            "error",
            `${capitalize(firstErrorKey)}: ${firstErrorMessage}`
          );
        }  
      } else if (error.response.status === 403) {
          if (error.response.data.hasOwnProperty('detail')) {
            
            handleOpenSnackbar(
              "error",
              `${capitalize("Error")}: ${error.response.data.detail}`
            );
          }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  const apiCall = async (method, url, data) => {
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      handleOpenSnackbar("success", response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  const columns = [
    columnHelper.accessor("nombre", {
      header: "Nombre",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      width: "20%",
    }),
    columnHelper.accessor("descripcion", {
      header: "Descripcion",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      width: "10%",
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <div
            className={`border-2 py-2 px-3 rounded-md w-32 ${
              row.original.estado == false
                ? "border-red-600 text-red-600"
                : "border-green-600 text-green-600"
            }`}
          >
            {row.original.estado ? "Activo" : "Inactivo"}
          </div>
        </div>
      ),
      footer: (info) => info.column.id,
      width: "15%",
      textAlign: "center",
    }),
    columnHelper.accessor("action", {
      header: "Acciones",
      cell: ({ row }) => {
        const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
        const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
        const [isChecked, setIsChecked] = useState(row.original.estado);

        const handleSwitchChange = () =>
          apiCall("patch", `${urlClienteApi}${row.original.id}/`, {
            estado: !row.original.estado,
          });
        const openModalDelete = () => setIsOpenModalDelete(true);
        const closeModalDelete = () => setIsOpenModalDelete(false);
        const openModalEdit = () => setIsOpenModalEdit(true);
        const closeModalEdit = () => setIsOpenModalEdit(false);

        return (
          <>
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-2 items-center h-full">
                {isChecked && (
                  <button
                    className="cursor-pointer p-2 bg-blue-500 rounded-md text-white"
                    title="Editar Cliente"
                    onClick={openModalEdit}
                  >
                    <PencilSquareIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                  </button>
                )}
                <button
                  className="cursor-pointer p-2 bg-red-500 rounded-md text-white"
                  title="Eliminar Cliente"
                  onClick={openModalDelete}
                >
                  <TrashIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                </button>
                <button
                  className="cursor-pointer rounded-md text-white"
                  title={`${
                    row.original.estado ? "Desactivar" : "Activar"
                  } cliente`}
                >
                  <Switch checked={isChecked} onChange={handleSwitchChange} />
                </button>
              </div>
            </div>
            <Modal isOpen={isOpenModalDelete}>
              {deleteForm(row, closeModalDelete)}
            </Modal>
            <Modal isOpen={isOpenModalEdit}>
              {editForm(row, closeModalEdit)}
            </Modal>
          </>
        );
      },
      footer: (info) => info.column.id,
      width: "15%",
      textAlign: "center",
    }),
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        className="max-w-60 text-sm text-center border-[1px] border-blue-500 rounded-md px-8 py-2 mb-8 font-medium text-blue-500 cursor-pointer"
        onClick={() => setIsOpenModal(true)}
      >
        {titleButtonOpenFormAdd}
      </button>
      <CustomDatatable data={data} columns={columns} pageInit={changeFetch} />
      <Modal isOpen={isOpenModal}>{addForm()}</Modal>
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={severity} variant="filled">
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
}
