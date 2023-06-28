const { Videogame, Genre } = require("../db");

async function updateGame(game) {

  let resultado = await Videogame.update(game, {
    where: {
        id: game.id
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

 return resultado
}

module.exports = {updateGame};