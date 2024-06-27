import { useAuth } from "../../security/Providers";
import { useState, useEffect } from "react";
import axios from "axios";

const CustomCombobox = ({ apiUrl }) => {
  const [people, setPeople] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { token } = useAuth();

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    // Utilizamos un timeout para permitir el click en las opciones antes de que se cierre
    setTimeout(() => setIsFocus(false), 200);
  };

  const handleSelected = (value) => {
    setSelectedPerson(value);
    setIsFocus(false); // Opcional: Cierra la lista desplegable después de seleccionar
  };

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPeople(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching Data:", error);
      });
  }, [apiUrl, token]);

  return (
    <>
      <div className="relative" onFocus={handleFocus} onBlur={handleBlur}>
        <input type="hidden" name="combox-value" />
        <input
          type="text"
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
          placeholder="Seleccione un valor"
          value={selectedPerson ? selectedPerson.nombre : ""}
          readOnly
        />
        {isFocus && (
          <div className="w-full absolute z-10  bg-gray-100">
            <ul>
              {people.map((value, index) => (
                <li
                  key={`option ${index}`}
                  className="py-2 pl-4 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handleSelected(value)}
                >
                  {value.nombre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCombobox;
