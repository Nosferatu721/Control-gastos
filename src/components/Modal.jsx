import { useState } from 'react';
import Swal from 'sweetalert2';

import CerrarBtn from '../img/cerrar.svg';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState('');

  const hadleCerrarModal = () => {
    setModal(false);
    setAnimarModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes('')) return Swal.fire({ icon: 'error', title: `Todos los campos son obligatorios` });

    // * Nice
    guardarGasto({ nombre, cantidad, categoria });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="Img" onClick={hadleCerrarModal} />
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
        <legend>Nuevo Gasto</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input id="nombre" type="text" autoComplete='off' placeholder="Añade el nombre del Gasto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad Gasto</label>
          <input
            id="cantidad"
            type="number"
            autoComplete='off'
            placeholder="Añade la cantidad del Gasto"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Tipo Gasto</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">--- Selecione una opcion ---</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value="Añadir Gastos" />
      </form>
    </div>
  );
};

export default Modal;
