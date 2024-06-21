import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "./Providers";

const LoginForm = () => {
  const { loginAction } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      loginAction(value);
    },
  });

  return (
    <div className="text-md 3xl:text-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-white p-8 shadow-lg w-full"
      >
        <div className="text-left">
          <div className="mb-4">
            <strong>Login de acceso</strong>
          </div>
          <hr className="mb-4" />
        </div>
        <div className="mb-4">
          <form.Field
            name="username"
            children={(field) => (
              <div className="text-left flex flex-col">
                <label className="text-[16px] ml-2 text-blue-500">
                  Nombre de usuario *
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingrese su correo electronico"
                />
              </div>
            )}
          />
        </div>
        <div className="mb-4">
          <form.Field
            name="password"
            children={(field) => (
              <div className="text-left flex flex-col">
                <label className="text-[16px] ml-2 text-blue-500">
                  Contraseña *
                </label>
                <input
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            )}
          />
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <button
            type="submit"
            className="w-full bg-[#5D9CEC] text-white p-2 rounded hover:bg-blue-600 transition duration-200 max-w-80"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
