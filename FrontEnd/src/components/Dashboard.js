import React from 'react';

const Dashboard = () => (
  <section className="page-section active">
    <h2>Dashboard Principal</h2>
    <p>Bienvenido al Sistema de Gestión de Depósito.</p>
    <div className="stats-cards">
      <div className="card">
        <h3>Productos Totales</h3>
        <p>125</p>
      </div>
      <div className="card">
        <h3>Stock Bajo</h3>
        <p>15</p>
      </div>
      <div className="card">
        <h3>Movimientos Hoy</h3>
        <p>32</p>
      </div>
    </div>
    <p>Aquí se mostrarán resúmenes, alertas importantes y accesos directos.</p>
  </section>
);

export default Dashboard;
