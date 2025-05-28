const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulación de login (ej: usuario ID = 1)
app.use(async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.query('SET @usuario_actual = ?', [1]); // Simular ID usuario
  req.conn = conn;
  next();
});

// Ruta para guardar producto
app.post('/api/productos', async (req, res) => {
  const { codigo, nombre, descripcion, unidad, stock } = req.body;

  try {
    const [result] = await req.conn.query(
      'INSERT INTO Producto (codigo, nombre, descripcion) VALUES (?, ?, ?)',
      [codigo, nombre, descripcion]
    );

    // Insertar en Inventario (depósito fijo por ahora: id 1)
    await req.conn.query(
      'INSERT INTO Inventario (producto_id, deposito_id, stock) VALUES (?, ?, ?)',
      [result.insertId, 1, stock]
    );

    res.status(201).json({ mensaje: 'Producto creado con éxito ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar producto ❌' });
  } finally {
    req.conn.release();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});