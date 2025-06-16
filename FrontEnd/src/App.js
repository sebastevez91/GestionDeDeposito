import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Estados para edición
  const [editingProducto, setEditingProducto] = useState(null);
  const [editingUsuario, setEditingUsuario] = useState(null);

  const handleEditProducto = (producto) => setEditingProducto(producto);
  const handleEditUsuario = (usuario) => setEditingUsuario(usuario);

  // Ver si estamos en la ruta de login
  const isLoginPage = location.pathname === '/';

  return (
    <div className="app-container">
      {/* Mostrar header y sidebar solo si está logueado */}
      <Header />
      <div className="container" style={{ display: 'flex' }}>
        {token && !isLoginPage && <Sidebar />}

        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/productos"
              element={
                <PrivateRoute>
                  <ProductosLista onEdit={handleEditProducto} />
                </PrivateRoute>
              }
            />
            <Route
              path="/productos/nuevo"
              element={
                <PrivateRoute>
                  <ProductosForm producto={null} />
                </PrivateRoute>
              }
            />
            <Route
              path="/productos/editar"
              element={
                <PrivateRoute>
                  <ProductosForm producto={editingProducto} />
                </PrivateRoute>
              }
            />

            <Route
              path="/stock-movimiento"
              element={
                <PrivateRoute>
                  <StockMovimiento />
                </PrivateRoute>
              }
            />

            <Route
              path="/movimientos-consulta"
              element={
                <PrivateRoute>
                  <MovimientosConsulta />
                </PrivateRoute>
              }
            />

            <Route
              path="/usuarios"
              element={
                <PrivateRoute>
                  <UsuariosLista onEdit={handleEditUsuario} />
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios/nuevo"
              element={
                <PrivateRoute>
                  <UsuariosForm usuario={null} />
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios/editar"
              element={
                <PrivateRoute>
                  <UsuariosForm usuario={editingUsuario} />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
