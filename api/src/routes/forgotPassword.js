const { Users } = require("../db");
const emailForgotPassword = require("./mailForgotPassword")

const forgotPassword = async (req, res) => {

  const { email } = req.params;
  const bcrypt = require('bcrypt');

  try {
    const user = await Users.findOne({
      where: { email: email },
      attributes: ['id', 'user'], // Aquí especificamos que solo queremos el atributo "id"
    });

    if (user) {
      // Si se encontró un usuario con el correo electrónico proporcionado
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const longitudCadena = 8;
      let cadenaAleatoria = '';
      for (let i = 0; i < longitudCadena; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        cadenaAleatoria += caracteres.charAt(indiceAleatorio);
      }

      const hashedPassword = await bcrypt.hash(cadenaAleatoria, 10);
      user.password = hashedPassword;
      await user.save();
      emailForgotPassword(user.user, cadenaAleatoria, email)
      res.json({ message: 'Contraseña actualizada exitosamente.' });
    } else {
      // Si no se encontró un usuario con el correo electrónico proporcionado
      res.status(404).json({ message: 'Usuario no encontrado.' });
    }
  } catch (error) {
    // Manejo de errores en caso de que ocurra algún problema en la consulta
    res.status(500).json({ message: 'Error en el servidor.' });
  }

  // try {
  //   const usuario = await Users.findByPk(id);
  //   if (!usuario) {
  //     return res.status(404).json({ message: "Usuario no encontrado" });
  //   }

  //   await usuario.update({ id, user, fullname, password, userAdmin, email, date, image, phone, tac, newsLetter });

  //   return res.json({ message: "Usuario actualizado correctamente" });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({ message: "Error al actualizar el usuario" });
  // }
};

// module.exports = { updateUser };


const express = require("express");
const router = express.Router();
// const updateUser = require("../controllers/userController");

router.put("/:email", forgotPassword);

module.exports = router;