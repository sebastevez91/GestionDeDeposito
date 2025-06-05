import React, { useState } from 'react';

const sampleProductos = [
  { codigo: 'PROD-001', nombre: 'Tornillos Phillips 1/2"' },
  { codigo: 'PROD-002', nombre: 'Arandelas Planas M6' },
  { codigo: 'PROD-003', nombre: 'Martillo de Uña' },
];

const StockMovimiento = () => {
  const [productoCodigo, setProductoCodigo] = useState('');
  const [tipoMovimiento, setTipoMovimiento] = useState('entrada');
  const [cantidad, setCantidad] = useState(1);
  const [observacion, setObservacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Movimiento registrado:\nProducto: ${productoCodigo}\nTipo: ${tipoMovimiento}\nCantidad: ${cantidad}\nObservación: ${observacion}`
    );
    // Limpiar form
    setProductoCodigo('');
    setTipoMovimiento('entrada');
    setCantidad(1);
    setObservacion('');
  };

  return (
    <section className="page-section">
      <h2>Registrar Movimiento de Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mov-producto">Producto:</label>
          <select
            id="mov-producto"
            value={productoCodigo}
            onChange={(e) => setProductoCodigo(e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {sampleProductos.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo de Movimiento:</label>
          <label>
            <input
              type="radio"
              name="tipo-movimiento"
              value="entrada"
              checked={tipoMovimiento === 'entrada'}
              onChange={() => setTipoMovimiento('entrada')}
            />
            Entrada
          </label>
          <label>
            <input
              type="radio"
              name="tipo-movimiento"
              value="salida"
              checked={tipoMovimiento === 'salida'}
              onChange={() => setTipoMovimiento('salida')}
            />
            Salida
          </label>
        </div>
        <div>
          <label htmlFor="mov-cantidad">Cantidad:</label>
          <input
            type="number"
            id="mov-cantidad"
            value={cantidad}
            min="1"
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="mov-observacion">Observación:</label>
          <textarea
            id="mov-observacion"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setProductoCodigo('');
              setTipoMovimiento('entrada');
              setCantidad(1);
              setObservacion('');
            }}
          >
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
};

export default StockMovimiento;
