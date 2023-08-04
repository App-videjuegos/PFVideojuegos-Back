// const { LoginGoogles } = require("../db");

// async function loginGoogles({
//   email,
//   family_name,
//   given_name,
//   google_id,
//   locale,
//   name,
//   picture,
//   verified_email,
// }) {
//   // Buscar si el usuario ya existe en la base de datos según su google_id
//       const existingUser = await LoginGoogles.findOne({
//           where: { google_id: google_id },
//         });
//     if (existingUser) {
//       throw Error
//     } else {
//     // El usuario no existe en la base de datos, crear uno nuevo
//       const newLoginGoogle = await LoginGoogles.create({
//         email,
//         family_name,
//         given_name,
//         google_id,
//         locale,
//         name,
//         picture,
//         verified_email,
//       });
//       // Enviar una respuesta al cliente
//       return newLoginGoogle;
//     }}

// module.exports = { loginGoogles }

const { LoginGoogles } = require("../db");
const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "tu_clave_secreta";

async function loginGoogles({
  id,
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
    const userDb = await Users.findOne({
      where: { email: email }
    })
    const token = jwt.sign({ userId: existingUser.id }, secretKey, {
      expiresIn: "1h",
    });
    // console.log(token);
    userDb.token = token; // Agregar el token al objeto resultado
    return { ...userDb.toJSON(), token }
  } 
  else {
    // El usuario no existe en la base de datos, crear uno nuevo
    if (verified_email) {
      // Enviar una respuesta al cliente
      // Creamos usuario logeado por medio de google.

      let resultado = await Users.create({
        id,
        user: email,
        password: " ",
        // isGoogle: true,
        fullname: name,
        userAdmin: true,
        email,
        date: Date.now(),
        image: picture,
        tac: true,
        newsLetter: true,
      });

      const newLoginGoogle = await LoginGoogles.create({
        email,
        family_name,
        given_name,
        google_id,
        locale,
        name,
        picture,
        verified_email,
        // user_id: resultado.id // falta esto
      });
      if (resultado && newLoginGoogle) {
        const token = jwt.sign({ userId: resultado.id }, secretKey, {
          expiresIn: "1h",
        });

        resultado.token = token; // Agregar el token al objeto resultado
        return { ...resultado.toJSON(), token }
      }
    }
    }
  }


module.exports = { loginGoogles };
