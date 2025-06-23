import React, { useEffect, useState } from 'react';
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom';

const UsuariosForm = ({ usuario }) => {
  const [form, setForm] = useState({ usuario: '', password: '', rol: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      setForm({
        usuario: usuario.usuario || '',
        password: '', // No se muestra la contraseña
        rol: usuario.rol || ''
      });
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (usuario) {
        // Edición
        await axios.put(`/usuarios/${usuario.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Creación
        await axios.post('/usuarios', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/usuarios');
    } catch (err) {
      setError('Error al guardar usuario');
    }
  };

  return (
    <div>
      <h2>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={form.usuario}
            onChange={(e) => setForm({ ...form, usuario: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Contraseña {usuario ? '(Dejar en blanco para no cambiar)' : ''}</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!usuario}
          />
        </div>
        <div>
          <label>Rol</label>
          <select
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value })}
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="admin">Admin</option>
            <option value="operador">Operador</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          {usuario ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default UsuariosForm;