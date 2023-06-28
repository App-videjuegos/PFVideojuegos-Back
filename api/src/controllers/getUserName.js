const { Users } = require("../db");
const { Op } = require("sequelize");

async function searchUser(user) {

  if (!user) { // si no se envia nombre, trae todos los Usuarios
    let allUsers = await Users.findAll();
    if (allUsers.length === 0) {
      return "message: No se encontraron usuarios en la Base de Datos";
    }
    return allUsers;

  } else {
    let userName = await Users.findAll({ // si se envia nombre, buscar en la DB por nombre
      
      where: { user: { [Op.iLike]: `%${user}%` } },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
    }
    });
    if (userName.length === 0) {
      return `No se encontraron usuarios con el nombre: ${user}`;
    }
    return userName;
  }
}

module.exports = { searchUser };