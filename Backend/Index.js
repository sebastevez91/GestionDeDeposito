require('dotenv').config(); // ✅ Leer variables de entorno
const express = require('express');
const cors = require('cors');
const path = require('path');
const { poolPromise } = require('./db'); // ✅ Adaptado para SQL Server
const loginRouter = require('./login');
const { verificarToken } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3001; // ✅ Usa puerto desde .env

// CORS para permitir acceso desde el frontend
app.use(cors({
  origin: 'http://localhost:3000', // ⚠️ Debe coincidir con el frontend
  credentials: false
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Si usás archivos estáticos

// Ruta raíz simple (opcional si no servís un frontend aquí)
app.get('/', (req, res) => {
  res.send('API de Gestión de Depósito');
});

// Ruta de login
app.use('/api', loginRouter);

// RUTA PROTEGIDA: Crear producto + inventario + auditoría
app.post('/api/productos', verificarToken, async (req, res) => {
  const { codigo, nombre, descripcion, stock } = req.body;
  const usuario_id = req.usuario.id;

  // Validación básica
  if (!codigo || !nombre || !descripcion || stock == null) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const pool = await poolPromise;

    // Insertar producto
    const resultProducto = await pool.request()
      .input('codigo', codigo)
      .input('nombre', nombre)
      .input('descripcion', descripcion)
      .query(`INSERT INTO Producto (codigo, nombre, descripcion)
              OUTPUT INSERTED.id
              VALUES (@codigo, @nombre, @descripcion)`);

    const productoId = resultProducto.recordset[0].id;

    // Insertar en inventario (depósito fijo = 1)
    await pool.request()
      .input('producto_id', productoId)
      .input('deposito_id', 1)
      .input('stock', stock)
      .query(`INSERT INTO Inventario (producto_id, deposito_id, stock)
              VALUES (@producto_id, @deposito_id, @stock)`);

    // Auditoría
    await pool.request()
      .input('tabla', 'Producto')
      .input('id_registro', productoId)
      .input('accion', 'INSERT')
      .input('usuario_id', usuario_id)
      .input('datos_nuevos', JSON.stringify({ codigo, nombre, descripcion, stock }))
      .query(`INSERT INTO Auditoria (tabla, id_registro, accion, usuario_id, datos_nuevos)
              VALUES (@tabla, @id_registro, @accion, @usuario_id, @datos_nuevos)`);

    res.status(201).json({ mensaje: 'Producto creado con éxito ✅' });

  } catch (err) {
    console.error('❌ Error al guardar producto:', err);
    res.status(500).json({ error: 'Error al guardar producto ❌' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
