import React, { useState, useEffect } from 'react';

const ProductosForm = ({ navigateTo, producto }) => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [unidad, setUnidad] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (producto) {
      setCodigo(producto.codigo);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setUnidad(producto.unidad);
      setStock(producto.stock);
    } else {
      // Limpia formulario para nuevo
      setCodigo('');
      setNombre('');
      setDescripcion('');
      setUnidad('');
      setStock(0);
    }
  }, [producto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí conectarías con backend (POST o PUT)
    alert(
      `Producto guardado:\nCódigo: ${codigo}\nNombre: ${nombre}\nDescripción: ${descripcion}\nUnidad: ${unidad}\nStock: ${stock}`
    );
    navigateTo('productos-lista');
  };

  return (
    <section className="page-section">
      <h2>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prod-codigo">Código:</label>
          <input
            type="text"
            id="prod-codigo"
            name="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            disabled={!!producto} // no se puede cambiar código si editando
          />
        </div>
        <div>
          <label htmlFor="prod-nombre">Nombre:</label>
          <input
            type="text"
            id="prod-nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prod-descripcion">Descripción:</label>
          <textarea
            id="prod-descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prod-unidad">Unidad de Medida:</label>
          <input
            type="text"
            id="prod-unidad"
            name="unidad"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prod-stock">Stock Inicial:</label>
          <input
            type="number"
            id="prod-stock"
            name="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            min="0"
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigateTo('productos-lista')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductosForm;
