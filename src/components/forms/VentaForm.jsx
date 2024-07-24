import { useForm } from "@tanstack/react-form";
import axios from "axios";
import FormError from "./FormError";
import CustomCombobox from "../combobox/CustomCombobox";
import AddIconOutline from "../icons/AddIconOutline";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Modal from "../modal/Modal";
import DeleteForm from "../form-delete/DeleteForm";
import { useAuth } from "../../security/Providers";

const columnHelper = createColumnHelper();

const VentaForm = ({
  closeModal,
  defaultData,
  title,
  isEdit,
  fetchPostData,
}) => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const openModalDelete = () => setIsOpenModalDelete(true);
  const closeModalDelete = () => setIsOpenModalDelete(false);

  const form = useForm({
    defaultValues: {
      producto: "",
      cantidad: "",
    },
    validateOnChange: true,
    onSubmit: async ({ value }) => {
      var new_value = {
        ...value.producto,
        cantidad: parseInt(value.cantidad, 10),
      };

      var var_data = [...data];
      let indice = var_data.findIndex((item) => item.id == new_value.id);

      if (indice > -1) {
        var_data[indice]["cantidad"] =
          parseInt(var_data[indice]["cantidad"], 10) + new_value["cantidad"];

        setData([...var_data]);
        setTotal(total + new_value.precio * new_value.cantidad);
      } else {
        setData([...data, new_value]);
        setTotal(total + new_value.precio * new_value.cantidad);
      }
    },
  });

  const [data, setData] = useState([]);
  const { token, logout } = useAuth();
  const [total, setTotal] = useState(0);
  const urlClienteApi = "http://127.0.0.1:8000/api/venta/";

  const apiCall = async (method, url, data) => {
    var data = {"productos": data};
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      handleOpenSnackbar("success", response.data.message);
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


  function eliminarProducto(value_row) {
    var var_data = [...data];

    let indice = var_data.findIndex((item) => item.id == value_row.id);
    if (indice > -1) {
      var_data.splice(indice, 1);
      setData([...var_data]);
      setTotal(total - value_row.precio * value_row.cantidad);
    }
  }

  const columns = [
    columnHelper.accessor("producto_almacen.nombre", {
      header: "Nombre",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      width: "20%",
    }),
    columnHelper.accessor("producto_almacen.categoria.nombre", {
      header: "Categoria",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
      width: "10%",
    }),

    columnHelper.accessor("precio", {
      header: "Precio",
      footer: (info) => info.column.id,
      width: "10%",
      textAlign: "center",
    }),
    columnHelper.accessor("cantidad", {
      header: "Cantidad",
      footer: (info) => info.column.id,
      width: "10%",
      textAlign: "center",
    }),
    columnHelper.accessor("importe", {
      header: "Importe",
      cell: ({ row }) => {
        console.log(row);
        return (
          <>
            <p>S/.{row.original.cantidad * row.original.precio}</p>
          </>
        );
      },
      footer: (info) => info.column.id,
      width: "15%",
      textAlign: "center",
    }),
    columnHelper.accessor("action", {
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <>
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-2 items-center h-full">
                <button
                  type="button"
                  className="cursor-pointer p-2 bg-red-500 rounded-md text-white"
                  title="Eliminar Producto"
                  onClick={() => eliminarProducto(row.original)}
                >
                  <TrashIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                </button>
              </div>
            </div>
          </>
        );
      },
      footer: (info) => info.column.id,
      width: "15%",
      textAlign: "center",
    }),
  ];

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {},
  });

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-white p-8 shadow-lg w-full"
      >
        <div>
          <div className="mb-4 text-left">
            <strong>{title}</strong>
          </div>
          <hr className="mb-4" />

          <div className="flex gap-4 w-full">
            <div className="mb-4 flex-1">
              <form.Field
                name="producto"
                validators={{
                  onChange: ({ value }) => {
                    if (value == "") {
                      return "Este campo no debe estar vacio.";
                    }
                  },
                }}
                children={(field) => (
                  <div className="text-left flex flex-col">
                    <label
                      className={`text-[14px] ml-2 ${
                        field.state.meta.errors.length > 0
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      Producto *
                    </label>
                    <CustomCombobox
                      name={field.name}
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      placeholder="Seleccione producto"
                      apiUrl={"http://127.0.0.1:8000/api/producto/"}
                      fnGetLabel={function (item) {
                        return `${item.producto_almacen.nombre} (${item.producto_almacen.categoria.nombre})`;
                      }}
                    />
                    {field.state.meta.errors && (
                      <span className="text-red-600 text-sm mt-1">
                        {field.state.meta.errors}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            
            <div className="mb-4 flex-1">
              <form.Field
                name="cantidad"
                validators={{
                  onChange: ({ value }) => {
                    if (value == "") {
                      return "Este campo no debe estar vacio.";
                    }
                  },
                }}
                children={(field) => (
                  <div className="text-left flex flex-col">
                    <label
                      className={`text-[14px] ml-2 ${
                        field.state.meta.errors.length > 0
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      Cantidad *
                    </label>
                    <input
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`w-full p-2 border rounded focus:outline-none focus:ring-1  ${
                        field.state.meta.errors.length > 0
                          ? "focus:ring-red-500 border-red-300"
                          : "focus:ring-blue-500 border-gray-300"
                      }`}
                      placeholder="Ingrese la cantidad"
                    />
                    {field.state.meta.errors && (
                      <span className="text-red-600 text-sm mt-1">
                        {field.state.meta.errors}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="bg-[#5D9CEC] text-white p-2 rounded hover:bg-blue-600 transition duration-200 flex gap-2 items-center px-8"
          >
            <AddIconOutline /> <div>Agregar</div>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-indigo-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs 3xl:text-sm font-medium text-gray-500 uppercase tracking-wider"
                      style={{
                        textAlign: header.column.columnDef.textAlign,
                        width: header.column.columnDef.width,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-indigo-100 ">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900"
                      style={{ textAlign: cell.column.columnDef.textAlign }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <div className="mr-2">
              <button
                type="button"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                onClick={openModalDelete}
              >
                Completar Venta
              </button>
            </div>

            <div
              style={{ textAlign: "center" }}
              className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900 bg-green-500"
            >
              Total
            </div>
            <div
              style={{ textAlign: "center" }}
              className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900 bg-green-500"
            >
              S/.{total}
            </div>
          </div>
        </div>
      </form>
      <Modal isOpen={isOpenModalDelete}>
        <DeleteForm
          isDelete={true}
          header="Completar Venta"
          body={`Estas seguro de completar esta venta?. `}
          closeModal={closeModalDelete}
          fetchDelete={() =>
            apiCall("post", `${urlClienteApi}`, data)
          }
        />
      </Modal>
    </div>
  );
};

export default VentaForm;
