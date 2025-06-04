// endpoints.js - CRUD con auditoría para Producto, Deposito, Inventario y Usuario

const express = require('express');
const router = express.Router();
const pool = require('./db');
const { registrarAuditoria } = require('./auditoria');

// ⚠️ Simulación de login temporal (reemplazar por auth real)
const usuario_id = 1;

//---------------------------------------------
// PRODUCTO
//---------------------------------------------
router.post('/productos', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      'INSERT INTO Producto (codigo, nombre, descripcion) VALUES (?, ?, ?)',
      [codigo, nombre, descripcion]
    );
    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: result.insertId,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { codigo, nombre, descripcion }
    });
    res.status(201).json({ mensaje: 'Producto creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

router.put('/productos/:id', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;
  const { id } = req.params;
  const conn = await pool.getConnection();
  try {
    const [oldData] = await conn.query('SELECT * FROM Producto WHERE id = ?', [id]);
    await conn.query('UPDATE Producto SET codigo=?, nombre=?, descripcion=? WHERE id=?', [codigo, nombre, descripcion, id]);
    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: id,
      accion: 'UPDATE',
      usuario_id,
      datos_anteriores: oldData[0],
      datos_nuevos: { codigo, nombre, descripcion }
    });
    res.json({ mensaje: 'Producto actualizado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await pool.getConnection();
  try {
    const [oldData] = await conn.query('SELECT * FROM Producto WHERE id = ?', [id]);
    await conn.query('DELETE FROM Producto WHERE id = ?', [id]);
    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: id,
      accion: 'DELETE',
      usuario_id,
      datos_anteriores: oldData[0]
    });
    res.json({ mensaje: 'Producto eliminado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

//---------------------------------------------
// DEPOSITO
//---------------------------------------------
router.post('/depositos', async (req, res) => {
  const { nombre, ubicacion } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query('INSERT INTO Deposito (nombre, ubicacion) VALUES (?, ?)', [nombre, ubicacion]);
    await registrarAuditoria({ tabla: 'Deposito', id_registro: result.insertId, accion: 'INSERT', usuario_id, datos_nuevos: { nombre, ubicacion } });
    res.status(201).json({ mensaje: 'Depósito creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

//---------------------------------------------
// INVENTARIO
//---------------------------------------------
router.post('/inventario', async (req, res) => {
  const { producto_id, deposito_id, stock } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query('INSERT INTO Inventario (producto_id, deposito_id, stock) VALUES (?, ?, ?)', [producto_id, deposito_id, stock]);
    await registrarAuditoria({ tabla: 'Inventario', id_registro: result.insertId, accion: 'INSERT', usuario_id, datos_nuevos: { producto_id, deposito_id, stock } });
    res.status(201).json({ mensaje: 'Stock agregado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

//---------------------------------------------
// USUARIO
//---------------------------------------------
router.post('/usuarios', async (req, res) => {
  const { nombre_usuario, email, password, rol_id, deposito_id } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      'INSERT INTO Usuario (nombre_usuario, email, password, rol_id, deposito_id) VALUES (?, ?, ?, ?, ?)',
      [nombre_usuario, email, password, rol_id, deposito_id]
    );
    await registrarAuditoria({
      tabla: 'Usuario',
      id_registro: result.insertId,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { nombre_usuario, email, rol_id, deposito_id }
    });
    res.status(201).json({ mensaje: 'Usuario creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;
