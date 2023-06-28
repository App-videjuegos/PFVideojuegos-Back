const { Users } = require("../db");

const updateUser = async (req, res) => {

  const { id, user, fullname, password, userAdmin, email, date, image, phone, tac, newsLetter } = req.body;

  try {
    const usuario = await Users.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.update({ id, user, fullname, password, userAdmin, email, date, image, phone, tac, newsLetter });

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
