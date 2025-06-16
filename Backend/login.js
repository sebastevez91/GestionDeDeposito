const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('./db');
const { generarToken } = require('./auth');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Usuarios WHERE username = @username');

    const usuario = result.recordset[0];

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario);
    res.json({ 
      token,
      usuario: { id: usuario.id, username: usuario.username, rol: usuario.rol }
    });

  } catch (err) {
    console.error('❌ Error en login:', err); 
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
