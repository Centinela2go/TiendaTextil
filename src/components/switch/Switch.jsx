import { useState } from "react";

const Switch = ({ checked, onChange }) => {
  return (
    <div>
      <div
        className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out select-none ${
          checked ? "bg-green-500" : "bg-gray-300"
        } rounded-full cursor-pointer`}
        onClick={onChange}
      >
        <span
          className={`absolute left-0 inline-block w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full shadow ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Switch;
