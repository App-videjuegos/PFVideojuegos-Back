require("dotenv").config();
const { Videogame } = require("../db");
const { Op } = require("sequelize");

async function searchDB(name) {
  if (!name) {
    let allGames = await Videogame.findAll();
    if (allGames.length === 0) {
      return "message: No se encontraron videojuegos en la Base de Datos";
    }
    return allGames;
  } else {
    let gameName = await Videogame.findAll({
      
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
    }
    });
    if (gameName.length === 0) {
      return `No se encontraron videojuegos con el nombre: ${name}`;
    }
    return gameName;
  }
}

module.exports = { searchDB };
