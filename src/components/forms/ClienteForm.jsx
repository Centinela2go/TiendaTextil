import { useForm } from "@tanstack/react-form";
import axios from "axios";

const ClienteForm = ({ closeModal, defaultData, title, isEdit, fetchPostData }) => {
  const form = useForm({
    defaultValues: defaultData
      ? { ...defaultData }
      : {
          nombre: "",
          direccion: "",
          telefono: "",
          email: "",
        },
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
              name="nombre"
              children={(field) => (
                <div className="text-left flex flex-col">
                  <label className="text-[14px] ml-2 text-blue-500">
                    Nombre *
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese el nombre del cliente"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <form.Field
              name="direccion"
              children={(field) => (
                <div className="text-left flex flex-col">
                  <label className="text-[14px] ml-2 text-blue-500">
                    Dirección
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese la dirección del cliente"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <form.Field
              name="telefono"
              children={(field) => (
                <div className="text-left flex flex-col">
                  <label className="text-[14px] ml-2 text-blue-500">
                    Telefono
                  </label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese el telefono del cliente"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <form.Field
              name="email"
              children={(field) => (
                <div className="text-left flex flex-col">
                  <label className="text-[14px] ml-2 text-blue-500">
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Ingrese la correo electronico del cliente"
                  />
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
            { isEdit ? "Editar": "Agregar"}
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

export default ClienteForm;
