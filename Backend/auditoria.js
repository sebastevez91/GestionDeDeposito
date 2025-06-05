const pool = require('./db');

async function registrarAuditoria({
  tabla,
  id_registro,
  accion,
  usuario_id,
  datos_anteriores = null,
  datos_nuevos = null
}) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO Auditoria (tabla, id_registro, accion, usuario_id, datos_anteriores, datos_nuevos)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        tabla,
        id_registro,
        accion,
        usuario_id,
        datos_anteriores ? JSON.stringify(datos_anteriores) : null,
        datos_nuevos ? JSON.stringify(datos_nuevos) : null
      ]
    );
  } catch (error) {
    console.error('Error registrando auditoría:', error);
    // No lances error: no debe romper la app si falla la auditoría
  } finally {
    conn.release();
  }
}

module.exports = { registrarAuditoria };