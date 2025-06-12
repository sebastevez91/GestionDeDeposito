import React, { useEffect, useState } from 'react';
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom';
import ProductoForm from './ProductoForm';
import ProductosLista from './ProductoLista';

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/productos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
      setError('');
    } catch (err) {
      setError('Error al obtener productos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Panel de Productos</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ProductoForm onSuccess={fetchProductos} />
      <ProductosLista productos={productos} onDeleteSuccess={fetchProductos} />
    </div>
  );
};

export default Dashboard;
