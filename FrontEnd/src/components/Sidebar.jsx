import React from 'react';

const Sidebar = ({ navigateTo }) => {
  const pages = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'productos-lista', label: 'Gestión de Productos' },
    { id: 'productos-form', label: 'Nuevo Producto' },
    { id: 'stock-movimiento', label: 'Registrar Movimiento' },
    { id: 'movimientos-consulta', label: 'Consultar Movimientos' },
    { id: 'usuarios-lista', label: 'Gestión de Usuarios (Admin)' },
    { id: 'usuarios-form', label: 'Nuevo Usuario (Admin)' },
  ];

  return (
    <aside className="sidebar sidebar-button">
      <h2>Navegación</h2>
      <nav>
        <ul>
          {pages.map(({ id, label }) => (
            <li key={id}>
              <button className="link-button  sidebar-button" onClick={() => navigateTo(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
