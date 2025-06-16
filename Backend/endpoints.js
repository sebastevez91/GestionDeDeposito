const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('./db');
const { registrarAuditoria } = require('./auditoria');
const { generarToken } = require('./auth');

// ⚠️ Simulación de login temporal
const usuario_id = 1;

//---------------------------------------------
// LOGIN
//---------------------------------------------
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Usuarios WHERE username = @username');

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = generarToken(usuario);
    res.json({ mensaje: 'Login exitoso ✅', token, usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol } });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//---------------------------------------------
// PRODUCTO
//---------------------------------------------
router.post('/productos', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codigo', sql.VarChar, codigo)
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.VarChar, descripcion)
      .query('INSERT INTO Producto (codigo, nombre, descripcion) OUTPUT INSERTED.id VALUES (@codigo, @nombre, @descripcion)');
    
    const id = result.recordset[0].id;

    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: id,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { codigo, nombre, descripcion }
    });

    res.status(201).json({ mensaje: 'Producto creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/productos/:id', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const oldDataResult = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Producto WHERE id = @id');
    const oldData = oldDataResult.recordset[0];

    await pool.request()
      .input('id', sql.Int, id)
      .input('codigo', sql.VarChar, codigo)
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.VarChar, descripcion)
      .query('UPDATE Producto SET codigo=@codigo, nombre=@nombre, descripcion=@descripcion WHERE id=@id');

    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: id,
      accion: 'UPDATE',
      usuario_id,
      datos_anteriores: oldData,
      datos_nuevos: { codigo, nombre, descripcion }
    });

    res.json({ mensaje: 'Producto actualizado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const oldDataResult = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Producto WHERE id = @id');
    const oldData = oldDataResult.recordset[0];

    await pool.request().input('id', sql.Int, id).query('DELETE FROM Producto WHERE id = @id');

    await registrarAuditoria({
      tabla: 'Producto',
      id_registro: id,
      accion: 'DELETE',
      usuario_id,
      datos_anteriores: oldData
    });

    res.json({ mensaje: 'Producto eliminado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------------
// DEPOSITO
//---------------------------------------------
router.post('/depositos', async (req, res) => {
  const { nombre, ubicacion } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('ubicacion', sql.VarChar, ubicacion)
      .query('INSERT INTO Deposito (nombre, ubicacion) OUTPUT INSERTED.id VALUES (@nombre, @ubicacion)');

    const id = result.recordset[0].id;

    await registrarAuditoria({
      tabla: 'Deposito',
      id_registro: id,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { nombre, ubicacion }
    });

    res.status(201).json({ mensaje: 'Depósito creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------------
// INVENTARIO
//---------------------------------------------
router.post('/inventario', async (req, res) => {
  const { producto_id, deposito_id, stock } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('producto_id', sql.Int, producto_id)
      .input('deposito_id', sql.Int, deposito_id)
      .input('stock', sql.Int, stock)
      .query('INSERT INTO Inventario (producto_id, deposito_id, stock) OUTPUT INSERTED.id VALUES (@producto_id, @deposito_id, @stock)');

    const id = result.recordset[0].id;

    await registrarAuditoria({
      tabla: 'Inventario',
      id_registro: id,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { producto_id, deposito_id, stock }
    });

    res.status(201).json({ mensaje: 'Stock agregado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------------
// USUARIO
//---------------------------------------------
router.post('/usuarios', async (req, res) => {
  const { username, email, password, rol_id, deposito_id } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .input('rol_id', sql.Int, rol_id)
      .input('deposito_id', sql.Int, deposito_id)
      .query(`INSERT INTO Usuario (username, email, password, rol_id, deposito_id)
              OUTPUT INSERTED.id
              VALUES (@username, @email, @password, @rol_id, @deposito_id)`);

    const id = result.recordset[0].id;

    await registrarAuditoria({
      tabla: 'Usuario',
      id_registro: id,
      accion: 'INSERT',
      usuario_id,
      datos_nuevos: { nombre_usuario, email, rol_id, deposito_id }
    });

    res.status(201).json({ mensaje: 'Usuario creado ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;