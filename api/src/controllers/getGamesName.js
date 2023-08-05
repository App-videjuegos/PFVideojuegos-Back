require("dotenv").config();
const { Videogame } = require("../db");
const { Op } = require("sequelize");

async function searchDB(name) {
  if (!name) {
    let allGames = await Videogame.findAll({
      where: {
        deleted: {
          [Op.eq]: false, // Solo traemos los videojuegos que no estan baneados
        }
      }
    });
    if (allGames.length === 0) {
      return "message: No se encontraron videojuegos en la Base de Datos";
    }
    return allGames;
  } else {
    let gameName = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
        deleted: false //si le pasan name pasa solo los que deleted estan false
      },
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

async function allGamesAdmin() {
  try {
    let allGames = await Videogame.findAll();
    if (allGames.length === 0) {
      throw new Error("No video games found");
    }
    return allGames;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = { searchDB, allGamesAdmin };
