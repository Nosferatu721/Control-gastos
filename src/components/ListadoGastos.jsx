import Gasto from '../components/Gasto';

const ListadoGastos = ({ gastos, setGastoEditar }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length > 0 ? 'Gastos' : 'No hay Gastos'}</h2>
      {gastos.map((gasto) => (
        <Gasto key={gasto.idKey} gasto={gasto} setGastoEditar={setGastoEditar} />
      ))}
    </div>
  );
};

export default ListadoGastos;
