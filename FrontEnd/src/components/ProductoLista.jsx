import React, { useState } from 'react';
import axios from '../Api/axios';

const ProductosLista = ({ productos, onDeleteSuccess }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    setError('');
    setLoadingId(id);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleteSuccess();
    } catch (err) {
      setError('Error al eliminar producto');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={loadingId === p.id}
                >
                  {loadingId === p.id ? 'Eliminando...' : '🗑️'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosLista;
