const jwt = require("jsonwebtoken");

const secretKey = 'l$%ale515%&$%2658u21556';
function generateToken(user, password) {

  // Configura las opciones del token (opcional)
  const options = {
    expiresIn: '2h', // Tiempo de expiración del token (2 horas en este caso)
  };

  // Objeto con los datos del usuario que se utilizarán como payload del token
  const payload = {
    user: user,
    password: password,
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

module.exports = { generateToken, secretKey };