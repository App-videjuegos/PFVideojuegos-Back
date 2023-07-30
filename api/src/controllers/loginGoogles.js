const { LoginGoogles } = require("../db");

async function loginGoogles({
  email,
  family_name,
  given_name,
  google_id,
  locale,
  name,
  picture,
  verified_email,
}) {
  // Buscar si el usuario ya existe en la base de datos según su google_id
      const existingUser = await LoginGoogles.findOne({
          where: { google_id: google_id },
        });
    if (existingUser) {
      throw Error
    } else {
    // El usuario no existe en la base de datos, crear uno nuevo
      const newLoginGoogle = await LoginGoogles.create({
        email,
        family_name,
        given_name,
        google_id,
        locale,
        name,
        picture,
        verified_email,
      });
      // Enviar una respuesta al cliente
      return newLoginGoogle;
    }}


module.exports = { loginGoogles }