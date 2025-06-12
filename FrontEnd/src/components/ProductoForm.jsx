import React, { useState } from 'react';
import axios from '../Api/axios';

const ProductoForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ codigo: '', nombre: '', descripcion: '', stock: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'stock' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/productos', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ codigo: '', nombre: '', descripcion: '', stock: 0 });
      if (onSuccess) onSuccess();
    } catch (err) {
      const mensaje = err.response?.data?.error || 'Error al crear producto';
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear producto'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ProductoForm;
