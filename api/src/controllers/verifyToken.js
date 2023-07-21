const jwt = require('jsonwebtoken');
const secretKey = require('./generatorJwt');

function verifyToken(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  try {
    // Verificar el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, secretKey);

    // Agregar los datos del usuario decodificados del token al objeto de solicitud
    req.userData = decodedToken;

    // Continuar con la solicitud hacia el controlador correspondiente
    next();
  } catch (error) {
    // Si hay un error al verificar el token, devolver un código de estado 401 (Unauthorized)
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = verifyToken;