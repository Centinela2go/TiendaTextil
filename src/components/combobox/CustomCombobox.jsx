import { useAuth } from "../../security/Providers";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

const CustomCombobox = ({ name, value, onChange, placeholder, apiUrl, fnGetLabel }) => {
  const [people, setPeople] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { token } = useAuth();
  const comboboxRef = useRef(null);

  const handleFocus = () => {
    setIsFocus(!isFocus);
  };

  const handleSelected = (value) => {
    setSelectedPerson(value);
    setIsFocus(false);
    onChange(value);
  };

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPeople(response.data.rows);
        if (value != "") {
          setSelectedPerson(response.data.rows.find(elto => elto.id == value));
        }
      })
      .catch((error) => {
        console.error("Error fetching Data:", error);
      });
  }, []);

  return (
    <>
      <div
        ref={comboboxRef}
        className="relative"
        tabIndex="0"
      >
        <div className="flex items-center relative">
          <input
            type="text"
            name={name}
            className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
            placeholder={placeholder}
            value={selectedPerson ? fnGetLabel(selectedPerson) : value}
            
            onClick={handleFocus}
            readOnly
          />
          {isFocus ? (
            <ChevronUpIcon className="absolute z-8 w-5 h-5 text-gray-400 mr-2 right-0" />
          ) : (
            <ChevronDownIcon className="absolute z-8 w-5 h-5 text-gray-400 mr-2 right-0" />
          )}
        </div>
        {isFocus && (
          <div className="w-full absolute z-10 bg-white shadow-lg rounded-md mt-1">
            <ul className="max-h-60 overflow-y-auto">
              {people.map((value, index) => (
                <li
                  key={`option-${index}`}
                  className="py-2 px-4 hover:bg-indigo-500 hover:text-white cursor-pointer"
                  // Prevent input blur on click
                  onClick={() => handleSelected(value)}
                >
                  {fnGetLabel(value)}
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
