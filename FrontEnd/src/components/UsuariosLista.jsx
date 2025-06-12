import React, { useState } from 'react';

const sampleUsuarios = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    usuario: 'juanp',
    email: 'juanp@example.com',
    rol: 'Admin',
    activo: true,
  },
  {
    id: 2,
    nombre: 'María Gómez',
    usuario: 'mariag',
    email: 'mariag@example.com',
    rol: 'Operario',
    activo: true,
  },
  {
    id: 3,
    nombre: 'Carlos Ruiz',
    usuario: 'carlosr',
    email: 'carlosr@example.com',
    rol: 'Operario',
    activo: false,
  },
];

const UsuariosLista = ({ navigateTo }) => {
  const [usuarios, setUsuarios] = useState(sampleUsuarios);
  const [filtro, setFiltro] = useState('');

  const filtrarUsuarios = () => {
    if (!filtro) return usuarios;
    return usuarios.filter(
      (u) =>
        u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        u.usuario.toLowerCase().includes(filtro.toLowerCase()) ||
        u.email.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const toggleActivo = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    );
  };

  return (
    <section className="page-section">
      <h2>Gestión de Usuarios</h2>
      <div className="actions-bar">
        <input
          type="text"
          placeholder="Buscar por nombre, usuario o email..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigateTo('usuarios-form')}
        >
          Nuevo Usuario
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarUsuarios().map((user) => (
            <tr key={user.id} className={user.activo ? '' : 'inactivo'}>
              <td>{user.nombre}</td>
              <td>{user.usuario}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>{user.activo ? 'Sí' : 'No'}</td>
              <td>
                <button
                  className="btn btn-sm"
                  onClick={() => navigateTo('usuarios-form', user)}
                >
                  Editar
                </button>{' '}
                <button
                  className={`btn btn-sm ${user.activo ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => toggleActivo(user.id)}
                >
                  {user.activo ? 'Inactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
          {filtrarUsuarios().length === 0 && (
            <tr>
              <td colSpan="6">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default UsuariosLista;
