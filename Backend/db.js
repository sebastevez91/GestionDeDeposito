const sql = require('mssql');
require('dotenv').config();

console.log('DB_SERVER desde .env:', process.env.DB_SERVER);

const config = {
  server: process.env.DB_SERVER, 
  database: process.env.DB_NAME, // nombre de la base datos
  user: process.env.DB_USER,     // nombre de usuario
  password: process.env.DB_PASSWORD,  // contraseña
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true,    // necesario en muchas conexiones
    trustServerCertificate: true,    //certificados autofirmados
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar a SQL Server: ', err);
  });

module.exports = { 
  sql,
  poolPromise
};