const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
const loginRouter = require('./login');
const { verificarToken } = require('./auth');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,  // si usas cookies o sesiones, si no puedes poner false
}));

app.use(express.json());
app.use(express.static(path.join(__dirname,)));

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login
app.use('/api', loginRouter);

// Endpoint protegido: crear producto
app.post('/api/productos', verificarToken, async (req, res) => {
  const { codigo, nombre, descripcion, stock } = req.body;
  const usuario_id = req.usuario.id; // extraído del token

  const conn = await pool.getConnection();
  try {
    // Insertar producto
    const [result] = await conn.query(
      'INSERT INTO Producto (codigo, nombre, descripcion) VALUES (?, ?, ?)',
      [codigo, nombre, descripcion]
    );

    // Insertar en Inventario (depósito fijo por ahora)
    await conn.query(
      'INSERT INTO Inventario (producto_id, deposito_id, stock) VALUES (?, ?, ?)',
      [result.insertId, 1, stock]
    );

    // Insertar auditoría
    await conn.query(
      'INSERT INTO Auditoria (tabla, id_registro, accion, usuario_id, datos_nuevos) VALUES (?, ?, ?, ?, ?)',
      ['Producto', result.insertId, 'INSERT', usuario_id, JSON.stringify({ codigo, nombre, descripcion, stock })]
    );

    res.status(201).json({ mensaje: 'Producto creado con éxito ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar producto ❌' });
  } finally {
    conn.release();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});