import { useState } from "react";
import "./style.css";
import { useForm } from "@tanstack/react-form";

const ClienteForm = () => {
  const form = useForm({
    defaultValues: {
      nombre: "",
      dirrecion: "",
      telefono: "",
      correo: ""
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
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
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[500px]"
      >
        <div className="mb-4">
          <form.Field
            name="nombre"
            children={(field) => (
              <div className="text-left">
                <label
                  htmlFor={field.name}
                  className="text-[14px] ml-2 -mb-2 text-blue-500"
                >
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
              <div className="text-left">
                <label
                  htmlFor={field.name}
                  className="text-[14px] ml-2 -mb-2 text-blue-500"
                >
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
              <div className="text-left">
                <label
                  htmlFor={field.name}
                  className="text-[14px] ml-2 -mb-2 text-blue-500"
                >
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
            name="correo"
            children={(field) => (
              <div className="text-left">
                <label
                  htmlFor={field.name}
                  className="text-[14px] ml-2 -mb-2 text-blue-500"
                >
                  Correo Electronico
                </label>
                <input
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
        <div className="flex justify-between gap-2">
        <button
          type="submit"
          className="w-full bg-[#5D9CEC] text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Agregar
        </button>
        <button
          type="button"
          className="w-full border-red-600 border-[1px]  p-2 rounded transition duration-200 text-red-600"
        >
          Cancelar
        </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
