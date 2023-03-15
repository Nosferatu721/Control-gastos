import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useState, useEffect } from 'react';

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const formatearPresupuesto = (cantidad) => cantidad.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    // ~ Calcular porcentaje
    const nuevoPorcentaje = (totalGastado * 100) / presupuesto;
    setPorcentaje(nuevoPorcentaje);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>
          <CircularProgressbar value={porcentaje} text={`${Math.round(porcentaje)}% Gastado`} />
        </p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {formatearPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
