import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <header>
      <h1>Sistema de Gestión de Depósito</h1>
      <div className="user-info">
        <span>Usuario: Operario Demo</span> |{' '}
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
