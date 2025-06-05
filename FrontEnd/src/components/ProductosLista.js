import React, { useState } from 'react';

const sampleProductos = [
  {
    codigo: 'PROD-001',
    nombre: 'Tornillos Phillips 1/2"',
    descripcion: 'Caja x100 unidades',
    stock: 50,
    unidad: 'Caja',
    activo: true,
  },
  {
    codigo: 'PROD-002',
    nombre: 'Arandelas Planas M6',
    descripcion: 'Bolsa x200 unidades',
    stock: 120,
    unidad: 'Bolsa',
    activo: true,
  },
  {
    codigo: 'PROD-003',
    nombre: 'Martillo de Uña',
    descripcion: 'Mango de madera, 16oz',
    stock: 15,
    unidad: 'Unidad',
    activo: true,
  },
];

const ProductosLista = ({ navigateTo }) => {
  const [productos, setProductos] = useState(sampleProductos);
  const [filtro, setFiltro] = useState('');

  const filtrarProductos = () => {
    if (!filtro) return productos;
    return productos.filter(
      (p) =>
        p.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const handleInactivar = (codigo) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.codigo === codigo ? { ...p, activo: !p.activo } : p
      )
    );
  };

  return (
    <section className="page-section">
      <h2>Listado de Productos</h2>
      <div className="actions-bar">
        <input
          type="text"
          placeholder="Buscar por código o nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigateTo('productos-form')}
        >
          Nuevo Producto
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock Actual</th>
            <th>Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarProductos().map((prod) => (
            <tr key={prod.codigo} className={prod.activo ? '' : 'inactivo'}>
              <td>{prod.codigo}</td>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.stock}</td>
              <td>{prod.unidad}</td>
              <td>
                <button
                  className="btn btn-sm"
                  onClick={() => navigateTo('productos-form', prod)}
                >
                  Editar
                </button>{' '}
                <button
                  className={`btn btn-sm ${prod.activo ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => handleInactivar(prod.codigo)}
                >
                  {prod.activo ? 'Inactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
          {filtrarProductos().length === 0 && (
            <tr>
              <td colSpan="6">No se encontraron productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ProductosLista;
