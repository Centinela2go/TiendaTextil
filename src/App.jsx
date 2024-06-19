import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ClienteForm from './components/forms/ClienteForm';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <ClienteForm /> {/* Añade el formulario aquí */}

    </>
  );
}

export default App;
