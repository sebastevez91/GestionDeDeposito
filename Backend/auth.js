const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'clave-secreta'; // 🔐 Usar JWT_SECRET en .env

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      rol_id: usuario.rol_id // 👈 Incluye el rol en el token
    },
    SECRET,
    { expiresIn: '2h' }
  );
}

function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol_id } = req.usuario;
    if (!rolesPermitidos.includes(rol_id)) {
      return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
}


function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // Agrega el usuario al request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generarToken, verificarToken, permitirRoles };

