import { useForm } from "@tanstack/react-form";
import axios from "axios";
import FormError from "./FormError";
import CustomCombobox from "../combobox/CustomCombobox";

const ProductoForm = ({
  closeModal,
  defaultData,
  title,
  isEdit,
  fetchPostData,
}) => {
  if (defaultData) {
  }
  const form = useForm({
    defaultValues: defaultData
      ? {
          precio: defaultData.precio,
          producto_almacen: defaultData.producto_almacen.id,
        }
      : {
          precio: "",
          producto_almacen: "",
        },
    validateOnChange: true,
    onSubmit: async ({ value }) => {
      // Do something with form data
      fetchPostData(value);
      closeModal();
    },
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
          
          <div className="mb-4">
            <form.Field
              name="producto_almacen"
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
                    Producto Almacen *
                  </label>
                  <CustomCombobox
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Seleccione producto almacen"
                    apiUrl={"http://127.0.0.1:8000/api/almacen/producto/"}
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
          
          <div className="mb-4">
            <form.Field
              name="precio"
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
                    Precio *
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
                    placeholder="Ingrese el precio del producto"
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
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full bg-[#5D9CEC] text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {isEdit ? "Editar" : "Agregar"}
          </button>
          <button
            type="button"
            className="w-full border-red-600 border-[1px]  p-2 rounded transition duration-200 text-red-600"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductoForm;
