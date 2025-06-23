import React, { useEffect, useState } from 'react';
import axios from '../Api/axios';

const UsuariosLista = ({ onEdit }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      setError('Error al obtener usuarios');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsuarios();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => onEdit(u)}>✏️</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosLista;