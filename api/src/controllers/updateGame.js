const { Videogame, Genre } = require("../db");

async function updateGame(game, id) {
  try {
    if(game.stock !== undefined && game.deleted !== undefined){
      console.log("estoy aqui en stock y delete juntos")
      await Videogame.update(game, {
        where: {
          id: id
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      let resultado = await Videogame.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      return resultado;
    }
    if (game.stock !== undefined) {
      if (game.stock > 0) {
        //console.log("Estoy en donde el stock es mayor a cero");
        game.deleted = false;
        await Videogame.update(game, {
          where: {
            id: id
          },
          include: {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        });
        let resultado = await Videogame.findByPk(id, {
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        });
        return resultado;
      } else if (game.stock === 0) {
        //console.log("Estoy en donde el stock es cero");
        game.deleted = true;
        await Videogame.update(game, {
          where: {
            id: id
          },
          include: {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        });
        let resultado = await Videogame.findByPk(id, {
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        });
        return resultado;
      } else {
        throw new Error("Cannot receive a negative amount");
      }
    } else {
      //console.log("Estoy en donde no envían prop stock");
      await Videogame.update(game, {
        where: {
          id: id
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      let resultado = await Videogame.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      return resultado;
    }
  } catch (error) {
    throw new Error("Error updating the videogame: " + error.message);
  }
}

module.exports = { updateGame };