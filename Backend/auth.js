const jwt = require('jsonwebtoken');
const SECRET = 'clave-secreta'; // 🔐 En producción usar variable de entorno

function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, nombre_usuario: usuario.nombre_usuario }, SECRET, {
    expiresIn: '2h'
  });
}

function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // Ahora disponible como req.usuario.id, etc.
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = { generarToken, verificarToken };