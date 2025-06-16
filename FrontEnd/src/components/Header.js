import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  let usuario = null;

  try {
    const storedUser = localStorage.getItem('usuario');
    usuario = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.warn('⚠️ Error al parsear usuario:', error);
    usuario = null;
  }

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <header>
      <h1>Sistema de Gestión de Depósito</h1>
      {usuario && (
        <div className="user-info">
          <span id='idNameUser' >Usuario: {usuario?.username + ' ' + usuario?.rol}</span> | {' '}
          <button onClick={handleLogout} className="btn btn-primary">
            Cerrar sesión
          </button>
        </div>        
      )}
    </header>
  );
};

export default Header;
