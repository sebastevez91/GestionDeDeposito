import React, { useState } from 'react';
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/login', { username, password });
      const { token, usuario } = res.data;

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log(usuario);
      
      if(usuario.rol.trim().toLowerCase() === "admin"){
        navigate('/admin/dashboard');
      }else{
        console.log("No inicio correctamente el rol")
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('❌ Error en login:', err); 
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className='toggle-panel toggle-left'>
        <h1>¡Hola, Bienvenido a Deposito Teach!</h1>
        <p>Para poder registrarte debes comunicarte con soporte</p>
      </div>
      <div className='login-box'>
        <h2>Acceso a su cuenta</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              value={username}
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
    </div>
  );
};

export default Login;
