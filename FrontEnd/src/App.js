import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ProductosLista from './components/ProductosLista';
import ProductosForm from './components/ProductosForm';
import StockMovimiento from './components/StockMovimiento';
import MovimientosConsulta from './components/MovimientosConsulta';
import UsuariosLista from './components/UsuariosLista';
import UsuariosForm from './components/UsuariosForm';
import './App.css';

function App() {
  const [page, setPage] = useState('dashboard');
  const [editingProducto, setEditingProducto] = useState(null);
  const [editingUsuario, setEditingUsuario] = useState(null);

  // Navegar entre páginas y pasar datos para editar
  const navigateTo = (pageName, data = null) => {
    setPage(pageName);
    if (pageName === 'productos-form') setEditingProducto(data);
    else setEditingProducto(null);

    if (pageName === 'usuarios-form') setEditingUsuario(data);
    else setEditingUsuario(null);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="container">
        <Sidebar navigateTo={navigateTo} />
        <main className="main-content">
          {page === 'dashboard' && <Dashboard />}
          {page === 'productos-lista' && <ProductosLista navigateTo={navigateTo} />}
          {page === 'productos-form' && (
            <ProductosForm navigateTo={navigateTo} producto={editingProducto} />
          )}
          {page === 'stock-movimiento' && <StockMovimiento />}
          {page === 'movimientos-consulta' && <MovimientosConsulta />}
          {page === 'usuarios-lista' && <UsuariosLista navigateTo={navigateTo} />}
          {page === 'usuarios-form' && (
            <UsuariosForm navigateTo={navigateTo} usuario={editingUsuario} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;