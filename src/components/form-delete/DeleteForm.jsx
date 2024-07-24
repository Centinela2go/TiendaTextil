import { useState } from "react";
import { useForm } from "@tanstack/react-form";

const DeleteForm = ({ row, isDelete, keyHeader, header, body, closeModal, fetchDelete }) => {
  const form = useForm({
    defaultValues: {
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      fetchDelete();
      closeModal()
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
        <div className="text-left">
          <div className="mb-4">
            <strong>{header}</strong>
          </div>
          <hr className="mb-4" />
        </div>
		<div className="font-light mb-8 text-left">
			<span>
				{body}{keyHeader &&  <strong>"{keyHeader}"</strong>}
			</span>
		</div>
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full bg-[#5D9CEC] text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {
              !isDelete ? "Eliminar": "Confirmar"
            }
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

export default DeleteForm;
