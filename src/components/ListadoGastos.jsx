import Gasto from '../components/Gasto';

const ListadoGastos = ({ gastos, setGastoEditar, eliminandoGasto, gastosFiltrados }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length > 0 ? 'Gastos' : 'No hay Gastos'}</h2>
      {gastosFiltrados.length > 0
        ? (gastosFiltrados.map((gasto) => <Gasto key={gasto.idKey} gasto={gasto} setGastoEditar={setGastoEditar} eliminandoGasto={eliminandoGasto} />))
        : gastos.map((gasto) => <Gasto key={gasto.idKey} gasto={gasto} setGastoEditar={setGastoEditar} eliminandoGasto={eliminandoGasto} />)}
    </div>
  );
};

export default ListadoGastos;
