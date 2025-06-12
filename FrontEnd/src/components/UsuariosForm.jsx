import React, { useState, useEffect } from 'react';

const UsuariosForm = ({ navigateTo, usuario }) => {
  const [nombre, setNombre] = useState('');
  const [usuarioLogin, setUsuarioLogin] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('Operario');
  const [activo, setActivo] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setUsuarioLogin(usuario.usuario);
      setEmail(usuario.email);
      setRol(usuario.rol);
      setActivo(usuario.activo);
      setPassword(''); // no se muestra contraseña
    } else {
      setNombre('');
      setUsuarioLogin('');
      setEmail('');
      setRol('Operario');
      setActivo(true);
      setPassword('');
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Usuario guardado:\nNombre: ${nombre}\nUsuario: ${usuarioLogin}\nEmail: ${email}\nRol: ${rol}\nActivo: ${activo}\nPassword: ${password ? '(modificada)' : '(sin cambios)'}`
    );
    navigateTo('usuarios-lista');
  };

  return (
    <section className="page-section">
      <h2>{usuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-nombre">Nombre Completo:</label>
          <input
            type="text"
            id="user-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="user-usuario">Usuario (login):</label>
          <input
            type="text"
            id="user-usuario"
            value={usuarioLogin}
            onChange={(e) => setUsuarioLogin(e.target.value)}
            required
            disabled={!!usuario} // no se puede cambiar login si editando
          />
        </div>
        <div>
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="user-rol">Rol:</label>
          <select
            id="user-rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Operario">Operario</option>
          </select>
        </div>
        <div>
          <label htmlFor="user-activo">Activo:</label>
          <input
            type="checkbox"
            id="user-activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="user-password">
            {usuario ? 'Cambiar Contraseña:' : 'Contraseña:'}
          </label>
          <input
            type="password"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!usuario}
            placeholder={usuario ? '(dejar vacío para no cambiar)' : ''}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigateTo('usuarios-lista')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default UsuariosForm;
