const { Videogame, Genre } = require("../db");

async function deleteGame(id) {
  let resultado = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  resultado.deleted = !resultado.deleted;
  await resultado.save(); 
}

module.exports = { deleteGame };