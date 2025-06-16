import React, { useState } from 'react';
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/login', { nombre_usuario, password });
      const { token, usuario } = res.data;

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // Redireccionar según el rol
      switch (usuario.rol_id) {
        case 1:
          navigate('/admin/dashboard');
          break;
        case 2:
          navigate('/operador/dashboard');
          break;
        case 3:
          navigate('/supervisor/dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="form-box login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={nombre_usuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="btn btn-primary" type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
