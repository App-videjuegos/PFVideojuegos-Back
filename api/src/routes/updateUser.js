const { Users } = require("../db");
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {

  const { ...allProperties } = req.body;
  let id = allProperties.id;

  try {
    const usuario = await Users.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (allProperties.pass) {
      const password = await bcrypt.hash(allProperties.pass, 10);
      allProperties.password = password;
      delete allProperties.id;
      delete allProperties.pass;
      console.log(allProperties)
      await usuario.update(allProperties);
    } else {
      delete allProperties.id;
      console.log(allProperties)
      await usuario.update(allProperties);
    }


    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

// module.exports = { updateUser };


const express = require("express");
const router = express.Router();
// const updateUser = require("../controllers/userController");

router.put("/", updateUser);

module.exports = router;
