const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');
const loginRouter = require('./login');
const { verificarToken } = require('./auth');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login
app.use('/api', loginRouter);

// ✅ Crear producto
app.post('/api/productos', verificarToken, async (req, res) => {
  const { codigo, nombre, descripcion, stock } = req.body;
  const usuario_id = req.usuario.id;

  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      'INSERT INTO Producto (codigo, nombre, descripcion) VALUES (?, ?, ?)',
      [codigo, nombre, descripcion]
    );

    await conn.query(
      'INSERT INTO Inventario (producto_id, deposito_id, stock) VALUES (?, ?, ?)',
      [result.insertId, 1, stock]
    );

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

// 📥 Obtener todos los productos
app.get('/api/productos', verificarToken, async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [productos] = await conn.query(`
      SELECT p.id, p.codigo, p.nombre, p.descripcion, i.stock
      FROM Producto p
      LEFT JOIN Inventario i ON i.producto_id = p.id AND i.deposito_id = 1
    `);
    res.json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos ❌' });
  } finally {
    conn.release();
  }
});

// ✏️ Actualizar producto
app.put('/api/productos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, stock } = req.body;
  const usuario_id = req.usuario.id;

  const conn = await pool.getConnection();
  try {
    const [productoAntiguo] = await conn.query('SELECT * FROM Producto WHERE id = ?', [id]);

    await conn.query(
      'UPDATE Producto SET codigo = ?, nombre = ?, descripcion = ? WHERE id = ?',
      [codigo, nombre, descripcion, id]
    );

    await conn.query(
      'UPDATE Inventario SET stock = ? WHERE producto_id = ? AND deposito_id = 1',
      [stock, id]
    );

    await conn.query(
      'INSERT INTO Auditoria (tabla, id_registro, accion, usuario_id, datos_anteriores, datos_nuevos) VALUES (?, ?, ?, ?, ?, ?)',
      ['Producto', id, 'UPDATE', usuario_id, JSON.stringify(productoAntiguo[0]), JSON.stringify({ codigo, nombre, descripcion, stock })]
    );

    res.json({ mensaje: 'Producto actualizado con éxito ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar producto ❌' });
  } finally {
    conn.release();
  }
});

// 🗑️ Eliminar producto
app.delete('/api/productos/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  const conn = await pool.getConnection();
  try {
    const [producto] = await conn.query('SELECT * FROM Producto WHERE id = ?', [id]);

    await conn.query('DELETE FROM Inventario WHERE producto_id = ? AND deposito_id = 1', [id]);
    await conn.query('DELETE FROM Producto WHERE id = ?', [id]);

    await conn.query(
      'INSERT INTO Auditoria (tabla, id_registro, accion, usuario_id, datos_anteriores) VALUES (?, ?, ?, ?, ?)',
      ['Producto', id, 'DELETE', usuario_id, JSON.stringify(producto[0])]
    );

    res.json({ mensaje: 'Producto eliminado con éxito ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar producto ❌' });
  } finally {
    conn.release();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
