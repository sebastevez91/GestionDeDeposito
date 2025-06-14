const { sql, poolPromise } = require('../db');

// Obtener todos los productos
async function getProductos() { 
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Productos');
        return result.recordset;
    } catch (err) {
        throw err;
    }
}

// Insertar un producto nuevo
async function crearProducto(nombre, descripcion, precio) {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('description', sql.VarChar, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .query('INSERT INTO Productos (nombre, descripcion, precio) VALUES (@nombre, @descripcion, @precio)');
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getProductos,
    crearProducto
};