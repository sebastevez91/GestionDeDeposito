const { sql, poolPromise } = require('../db');

async function registrarMovimiento(productoId, tipo, cantidad) {
  const pool = await poolPromise;
  await pool.request()
    .input('productoId', sql.Int, productoId)
    .input('tipo', sql.VarChar, tipo)
    .input('cantidad', sql.Int, cantidad)
    .query(`
      INSERT INTO Movimientos (productoId, tipo, cantidad)
      VALUES (@productoId, @tipo, @cantidad)
    `);
}

async function getMovimientos() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Movimientos ORDER BY fecha DESC');
  return result.recordset;
}

module.exports = {
  registrarMovimiento,
  getMovimientos
};
