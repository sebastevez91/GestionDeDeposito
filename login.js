const express = require('express');
const router = express.Router();
const pool = require('./db');
const { generarToken } = require('./auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM Usuario WHERE email = ?', [email]);
    const usuario = rows[0];

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    conn.release();
  }
});

module.exports = router;
