import { useState } from 'react';
import './style.css'; 

const ClienteForm = () => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const nuevoCliente = {
            id,
            nombre,
            direccion,
            telefono,
            email
        };
        console.log('Cliente agregado:', nuevoCliente);

        // Limpiar los campos
        setId('');
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
    };

    const handleCancel = () => {
        // Limpiar los campos
        setId('');
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
    };

    return (
        <div className="cliente-form-container">
            <h2 className="form-title">Agregar Cliente</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="buttons">
                    <button type="submit" className="btn-agregar">Agregar Cliente</button>
                    <button type="button" className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default ClienteForm;
