import Swal from 'sweetalert2';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const handlePresupuesto = (e) => {
    e.preventDefault();
    // * Validar Valor de Presupuesto
    if (!presupuesto || presupuesto < 0)
      return Swal.fire({ icon: 'error', title: `${presupuesto} No es un valor correcto 💩` });
    
    // * Nice
    setIsValidPresupuesto(true)
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="inpPresupuesto">Definir</label>
          <input
            id="inpPresupuesto"
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(parseInt(e.target.value))}
            autoComplete="off"
          />

          <input type="submit" value="Añadir" />
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
