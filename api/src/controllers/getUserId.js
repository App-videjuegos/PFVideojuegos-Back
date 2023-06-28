const { Users } = require("../db");

async function searchUserById(idUser) {
  try {
    const user = await Users.findByPk(idUser); // Buscar el usuario por su ID
    if (!user) { // Verificar si el usuario no existe
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error(`Error al buscar usuario por ID: ${error.message}`);
  }
}

module.exports = { searchUserById };