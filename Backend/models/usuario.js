const { sql, poolPromise } = require('../db');

async function crearUsuario(username, password, rol) {
  const pool = await poolPromise;
  await pool.request()
    .input('username', sql.VarChar, username)
    .input('password', sql.VarChar, password)
    .input('rol', sql.VarChar, rol)
    .query('INSERT INTO Usuarios (username, password, rol) VALUES (@username, @password, @rol)');
}

async function buscarPorUsername(username) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query('SELECT * FROM Usuarios WHERE username = @username');
  return result.recordset[0];
}

module.exports = {
  crearUsuario,
  buscarPorUsername
};
