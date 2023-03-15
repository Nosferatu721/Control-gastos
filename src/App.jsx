import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Filtro from './components/Filtro';

function App() {
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? []);

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }
  }, [gastoEditar]);

  // * Validar si hay un presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);
  // * Validar si hay gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos ?? []));
  }, [gastos]);
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  // * Filtro useState
  useEffect(() => {
    if (filtro) {
      if (filtro === 'todos') return setGastosFiltrados([]);
      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const guardarGasto = (gasto) => {
    if (gasto.idKey) {
      // * Actualizar
      const gastosActualizados = gastos.map((gastoState) => (gastoState.idKey === gasto.idKey ? gasto : gastoState));
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // * Crear
      let fecha = new Date();
      setGastos([...gastos, { ...gasto, idKey: uuidv4(), fecha }]);
    }
    setModal(false);
    setAnimarModal(false);
  };

  const eliminandoGasto = async (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.idKey !== id);
    let result = await Swal.fire({
      title: '¿Deseas eliminar este gasto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    });
    if (result.isConfirmed) {
      Swal.fire('Eliminado!', '', 'success');
      setGastos(gastosActualizados);
    }
  };

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminandoGasto={eliminandoGasto} gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="Img" onClick={handleNuevoGasto} />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
