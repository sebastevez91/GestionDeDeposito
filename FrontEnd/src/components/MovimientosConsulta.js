import React, { useState } from 'react';

const sampleMovimientos = [
  {
    fecha: '2024-05-01',
    producto: 'Tornillos Phillips 1/2"',
    tipo: 'entrada',
    cantidad: 100,
    usuario: 'Operario Demo',
    observacion: 'Ingreso inicial',
  },
  {
    fecha: '2024-05-03',
    producto: 'Martillo de Uña',
    tipo: 'salida',
    cantidad: 5,
    usuario: 'Operario Demo',
    observacion: 'Salida para obra',
  },
  {
    fecha: '2024-05-05',
    producto: 'Arandelas Planas M6',
    tipo: 'entrada',
    cantidad: 50,
    usuario: 'Operario Demo',
    observacion: '',
  },
];

const MovimientosConsulta = () => {
  const [filtroProducto, setFiltroProducto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  const filtrarMovimientos = () => {
    return sampleMovimientos.filter((mov) => {
      return (
        (filtroProducto === '' ||
          mov.producto.toLowerCase().includes(filtroProducto.toLowerCase())) &&
        (filtroTipo === '' || mov.tipo === filtroTipo)
      );
    });
  };

  return (
    <section className="page-section">
      <h2>Consulta de Movimientos</h2>
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Filtrar por producto"
          value={filtroProducto}
          onChange={(e) => setFiltroProducto(e.target.value)}
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Usuario</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {filtrarMovimientos().map((mov, i) => (
            <tr key={i}>
              <td>{mov.fecha}</td>
              <td>{mov.producto}</td>
              <td>{mov.tipo === 'entrada' ? 'Entrada' : 'Salida'}</td>
              <td>{mov.cantidad}</td>
              <td>{mov.usuario}</td>
              <td>{mov.observacion}</td>
            </tr>
          ))}
          {filtrarMovimientos().length === 0 && (
            <tr>
              <td colSpan="6">No se encontraron movimientos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default MovimientosConsulta;
