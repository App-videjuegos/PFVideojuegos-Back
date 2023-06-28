const { Users } = require("../db");

async function deleteUser(id) {
  let user = await Users.findByPk(id);

  if (!user) {
    throw new Error(`No existe usuario con el id: ${id}`);
  }

  // Realiza el borrado lógico
  user.deleted = !user.deleted;
  await user.save();
}

module.exports = { deleteUser };
