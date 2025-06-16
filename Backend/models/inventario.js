const { sql, poolPromise } = require('../db');

async function getInventario() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Inventario');
  return result.recordset;
}

async function actualizarInventario(productoId, cantidad, ubicacion) {
  const pool = await poolPromise;
  await pool.request()
    .input('productoId', sql.Int, productoId)
    .input('cantidad', sql.Int, cantidad)
    .input('ubicacion', sql.VarChar, ubicacion)
    .query(`
      UPDATE Inventario
      SET cantidad = @cantidad, ubicacion = @ubicacion
      WHERE productoId = @productoId
    `);
}

module.exports = {
  getInventario,
  actualizarInventario
};
