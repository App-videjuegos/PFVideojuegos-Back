const { Users } = require("../db");
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const updateUser = async (req, res) => {

  const { ...allProperties } = req.body;
  let id = allProperties.id;

  try {
    if (allProperties.user){
      const repeatUser =await Users.findOne({
        where: {
          user: {[Op.eq]: allProperties.user},
        }
      })
      if (repeatUser) {
        return res.status(500).json({ message: `The user ${allProperties.user} is already assigned to another user.` });
      }
    }

    if (allProperties.email){
      const repeatEmail = await Users.findOne({
        where: {
          email: {[Op.eq]: allProperties.email.toLowerCase()},
        }
      })
      if (repeatEmail) {
        return res.status(500).json({ message: `The email address is already associated with another account.` });
      }
    }

    if (allProperties.phone){
      const repeatPhone = await Users.findOne({
        where: {
          phone: {[Op.eq]: allProperties.phone.toLowerCase()},
        }
      })
      if (repeatPhone) {
        return res.status(500).json({ message: `The phone is already associated with another account.` });
      }
    }

    const usuario = await Users.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (allProperties.pass) {
      const password = await bcrypt.hash(allProperties.pass, 10);
      allProperties.password = password;
      delete allProperties.id;
      delete allProperties.pass;
      //console.log(allProperties)
      const response= await usuario.update(allProperties);
      res.status(200).json(response );
    } else {
      delete allProperties.id;
      //console.log(allProperties)
      const response = await usuario.update(allProperties);
      res.status(200).json(response );
    }

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
