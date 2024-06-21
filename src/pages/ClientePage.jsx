import DataTable from "../components/tables/datatable";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";
import ClienteForm from "../components/forms/ClienteForm";
import DeleteForm from "../components/form-delete/DeleteForm";
import axios from "axios";
import { useAuth } from "../security/Providers";

const columnHelper = createColumnHelper();


export default function ClientePage() {
  const [data, setData] = useState(() => []);
  const auth = useAuth();

  const columns = [
    columnHelper.accessor("nombre", {
      header: () => "Nombre",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      textAlign: "left",
      width: "20%",
    }),
    // columnHelper.accessor((row) => row.lastName, {
    //   id: "direccion",
    //   cell: (info) => <i>{info.getValue()}</i>,
    //   header: () => <span>Last Name</span>,
    //   footer: (info) => info.column.id,
    //   textAlign: "left",
    //   width: "20%",
    // }),
    columnHelper.accessor("direccion", {
      header: () => "Direccion",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      textAlign: "left",
      width: "10%",
    }),
    columnHelper.accessor("telefono", {
      header: () => "Telefono",
      footer: (info) => info.column.id,
      textAlign: "center",
      width: "10%",
    }),
    columnHelper.accessor("email", {
      header: () => "Correo",
      footer: (info) => info.column.id,
      textAlign: "right",
      width: "10%",
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      footer: (info) => info.column.id,
      textAlign: "center",
      width: "20%",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <div
              className={`border-2 py-2 px-3 rounded-md w-32 ${
                row.original.estado == false
                  ? "border-red-600 text-red-600"
                  : "border-green-600 text-green-600"
              }`}
            >
              {row.original.estado ? "Activo": "Inactivo"}
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("action", {
      header: "Acciones",
      footer: (info) => info.column.id,
      textAlign: "center",
      width: "20%",
      cell: ({ row }) => {
        const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
        const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  
        const openModalDelete = () => {
          setIsOpenModalDelete(true);
        };
  
        const closeModalDelete = () => {
          setIsOpenModalDelete(false);
        };
  
        const openModalEdit = () => {
          setIsOpenModalEdit(true);
        };
  
        const closeModalEdit = () => {
          setIsOpenModalEdit(false);
        };
  
        const fetchPutData = (value) => {
          try {
            const response = axios.put(`http://127.0.0.1:8000/api/cliente/${row.original.id}/`, value, {
              headers: {
                'Authorization': `Bearer ${auth.token}`,
              }
            }).then((res) => {
               fetchData();
            })
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        const fetchDeleteData = () => {
          try {
            const response = axios.delete(`http://127.0.0.1:8000/api/cliente/${row.original.id}/`, {
              headers: {
                'Authorization': `Bearer ${auth.token}`,
              }
            }).then((res) => {
               fetchData();
            })
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
  
        return (
          <>
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  className="cursor-pointer p-2 bg-blue-500 rounded-md text-white"
                  title="Editar Cliente"
                  onClick={openModalEdit}
                >
                  <PencilSquareIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                </button>
                <button
                  className="cursor-pointer p-2 bg-red-500 rounded-md text-white"
                  title="Eliminar Cliente"
                  onClick={openModalDelete}
                >
                  <TrashIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                </button>
              </div>
            </div>
            <Modal isOpen={isOpenModalDelete}>
              <div className="text-sm 3xl:text-xl">
                <DeleteForm
                  row={row}
                  header={"Eliminar cliente"}
                  body={`Estas seguro de eliminar el cliente con nombre: `}
                  keyHeader={row.original.nombre}
                  closeModal={closeModalDelete}
                  fetchDelete={fetchDeleteData}
                />
              </div>
            </Modal>
            <Modal isOpen={isOpenModalEdit}>
              <div className="text-sm 3xl:text-xl">
                <ClienteForm
                  title={"Editar cliente"}
                  defaultData={row.original}
                  closeModal={closeModalEdit}
                  isEdit={true}
                  fetchPostData={fetchPutData}
                />
              </div>
            </Modal>
          </>
        );
      },
    }),
  ];
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const fetchData = () => {
    try {
      const response = axios.get("http://127.0.0.1:8000/api/cliente/", {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        }
      }).then((res) => {
        setData(res.data.rows);
        console.log(res.data.rows);
      })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPostData = (value) => {
    try {
      const response = axios.post("http://127.0.0.1:8000/api/cliente/", value, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        }
      }).then((res) => {
        fetchData();
      })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        className="max-w-60 text-sm text-center border-[1px] border-blue-500 rounded-md px-8 py-2 mb-8 font-medium text-blue-500 cursor-pointer"
        onClick={openModal}
      >
        Agregar Cliente
      </button>
      <div>
        <DataTable data={data} columns={columns} />
      </div>

      <div className="w-full flex items-center justify-center text-sm 3xl:text-xl">
        <Modal isOpen={isOpenModal}>
          <ClienteForm title={"Agregar Cliente"} closeModal={closeModal} fetchPostData={fetchPostData} />
        </Modal>
      </div>
    </div>
  );
}
