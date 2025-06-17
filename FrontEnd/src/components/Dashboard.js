import React, { useEffect, useState } from 'react';
import axios from '../Api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/dashboard'); // asegurate de que esté en axios.js el baseURL con /api
        setCantidadProductos(res.data.cantidad);
      } catch (err) {
        console.error('Error al cargar dashboard:', err);
        setError('No se pudo cargar la información del tablero');
      }
    };
    fetchDashboardData();
  }, []);

    return (
      <section className="page-section active">
        <h2>Tablero Principal</h2>
        <p>Bienvenido al Sistema de Gestión de Depósito.</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="stats-cards">
          <div className="card">
            <h3>Productos Totales</h3>
            <p>{cantidadProductos}</p>
          </div>
          <div className="card">
            <h3>Stock Bajo</h3>
            <p>15</p> {/* Este valor puede venir de la API también si lo agregás */}
          </div>
          <div className="card">
            <h3>Movimientos Hoy</h3>
            <p>32</p> {/* También podés hacerlo dinámico luego */}
          </div>
        </div>

        <p>Aquí se mostrarán resúmenes, alertas importantes y accesos directos.</p>
      </section>
    );
}

export default Dashboard;
