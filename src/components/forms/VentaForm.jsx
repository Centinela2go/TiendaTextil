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

const columnHelper = createColumnHelper();

const VentaForm = ({
  closeModal,
  defaultData,
  title,
  isEdit,
  fetchPostData,
}) => {
  if (defaultData) {
  }
  const form = useForm({
    defaultValues: {
      producto: "",
      cantidad: "",
    },
    validateOnChange: true,
    onSubmit: async ({ value }) => {
      console.log(value);
      var new_value = value.producto;
      new_value["cantidad"] = value.cantidad;
      setData([...data, new_value]);
      setTotal(total + new_value.precio * new_value.cantidad);
    },
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

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
                {
                  <button
                    className="cursor-pointer p-2 bg-blue-500 rounded-md text-white"
                    title="Editar Cantidad"
                  >
                    <PencilSquareIcon className="h-4 w-4 3xl:h-6 3xl:w-6" />
                  </button>
                }
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
            {/* <div className="mb-4 flex-1">
              <form.Field
                name="cliente"
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
                      Cliente *
                    </label>
                    <CustomCombobox
                      name={field.name}
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      placeholder="Seleccione producto almacen"
                      apiUrl={"http://127.0.0.1:8000/api/cliente/"}
                      fnGetLabel={function (item) {
                        return `${item.nombre}`;
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
            </div> */}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td
                style={{ textAlign: "center" }}
                className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900 bg-green-500"
              >
                Total
              </td>
              <td
                style={{ textAlign: "center" }}
                className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900 bg-green-500"
              >
                S/.{total}
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
};

export default VentaForm;
